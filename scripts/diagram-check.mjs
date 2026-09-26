import puppeteer from 'puppeteer-core';

const baseUrl = process.argv[2];
if (!baseUrl) {
  console.error('Usage: npm run test:diagrams -- <base-url>');
  process.exit(2);
}

const keys = ['jarvis-v2', 'cauce-v3', 'ia-gguf', 'reel-forge'];
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox'],
});
let failures = 0;

try {
  for (const key of keys) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    const pageErrors = [];
    page.on('pageerror', (error) => pageErrors.push(error.message));
    const url = new URL(`/components/${key}/`, baseUrl).href;

    try {
      const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      if (!response?.ok()) throw new Error(`HTTP ${response?.status() ?? 'unknown'}`);
      await page.waitForSelector('.detail-diagram svg .node', { timeout: 15000 });

      const result = await page.evaluate(() => {
        const svg = document.querySelector('.detail-diagram svg');
        const nodes = [...svg.querySelectorAll('.node')];
        return {
          nodes: nodes.length,
          labeled: nodes.filter((node) => node.querySelector('text')?.textContent?.trim()).length,
          embeddedHtml: svg.querySelectorAll('foreignObject').length,
          pageOverflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      const passed = result.nodes > 0 && result.labeled === result.nodes
        && result.embeddedHtml === 0 && !result.pageOverflow && pageErrors.length === 0;
      console.log(`${key}: ${result.labeled}/${result.nodes} labels; foreignObject=${result.embeddedHtml}; pageOverflow=${result.pageOverflow}`);
      if (!passed) {
        console.error(`${key}: missing SVG labels or browser errors`, pageErrors);
        failures++;
      }
    } catch (error) {
      console.error(`${key}: ${error instanceof Error ? error.message : String(error)}`);
      failures++;
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}

process.exit(failures > 0 ? 1 : 0);
