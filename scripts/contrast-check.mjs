import puppeteer from 'puppeteer-core';

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error('Usage: npm run test:contrast -- <url> [url...]');
  process.exit(2);
}

const scan = () => {
  const colorOf = (value) => {
    const values = (value || '').match(/[\d.]+/g)?.map(Number);
    return values?.length >= 3 ? [...values.slice(0, 3), values[3] ?? 1] : null;
  };
  const luminance = (rgb) => {
    const linear = rgb.map((channel) => {
      const value = channel / 255;
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const contrast = (foreground, background) => {
    const levels = [luminance(foreground), luminance(background)];
    return (Math.max(...levels) + 0.05) / (Math.min(...levels) + 0.05);
  };
  const backgroundOf = (element) => {
    const ancestors = [];
    for (let node = element; node; node = node.parentElement) ancestors.push(node);
    let background = [255, 255, 255];
    // CSS background layers are translucent in several notes and badges.
    // Composite each ancestor instead of treating a 9% tint as an opaque fill.
    for (const node of ancestors.reverse()) {
      const layer = colorOf(getComputedStyle(node).backgroundColor);
      if (!layer) continue;
      background = background.map((channel, index) =>
        layer[index] * layer[3] + channel * (1 - layer[3]));
    }
    return background;
  };

  const low = [];
  for (const element of document.querySelectorAll('body *')) {
    const hasText = [...element.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim());
    if (!hasText) continue;
    const style = getComputedStyle(element);
    if (style.visibility === 'hidden' || style.display === 'none') continue;
    const foreground = colorOf(style.color);
    if (!foreground) continue;
    const background = backgroundOf(element);
    const ratio = contrast(foreground, background);
    const size = parseFloat(style.fontSize);
    const large = size >= 24 || (size >= 18.66 && parseInt(style.fontWeight, 10) >= 700);
    if (ratio < (large ? 3 : 4.5)) {
      low.push({
        t: element.textContent.trim().slice(0, 30),
        fg: style.color,
        bg: `rgb(${background.map(Math.round).join(', ')})`,
        r: Number(ratio.toFixed(2)),
      });
    }
  }
  return { low: low.length, worst: low.sort((a, b) => a.r - b.r).slice(0, 8) };
};

let failures = 0;
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
});
try {
  for (const url of urls) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      if (!response?.ok()) throw new Error(`HTTP ${response?.status() ?? 'unknown'}`);
      const result = await page.evaluate(scan);
      console.log(url, JSON.stringify(result));
      if (result.low > 0) failures++;
    } catch (error) {
      console.error(url, error instanceof Error ? error.message : String(error));
      failures++;
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}

process.exit(failures > 0 ? 1 : 0);
