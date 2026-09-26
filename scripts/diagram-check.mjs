import puppeteer from 'puppeteer-core';

const baseUrl = process.argv[2];
if (!baseUrl) {
  console.error('Usage: npm run test:diagrams -- <base-url>');
  process.exit(2);
}

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox'],
});
let failures = 0;

try {
  const index = await browser.newPage();
  const indexResponse = await index.goto(new URL('/architecture/', baseUrl).href, {
    waitUntil: 'networkidle2', timeout: 60000,
  });
  if (!indexResponse?.ok()) throw new Error(`Architecture HTTP ${indexResponse?.status() ?? 'unknown'}`);
  const keys = await index.evaluate(() => [...new Set(
    [...document.querySelectorAll('a[href^="/components/"]')]
      .map((link) => link.getAttribute('href')?.match(/^\/components\/([^/?#]+)\/?$/)?.[1])
      .filter(Boolean),
  )]);
  await index.close();
  if (keys.length === 0) throw new Error('No project pages found in architecture index');

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
          misaligned: nodes.filter((node) => {
            const shape = node.querySelector('.label-container');
            const label = node.querySelector('.label text');
            if (!shape || !label) return true;
            const box = shape.getBoundingClientRect();
            const text = label.getBoundingClientRect();
            return text.top < box.top - 2 || text.bottom > box.bottom + 2;
          }).length,
          embeddedHtml: svg.querySelectorAll('foreignObject').length,
          pageOverflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      const passed = result.nodes > 0 && result.labeled === result.nodes
        && result.misaligned === 0 && result.embeddedHtml === 0
        && !result.pageOverflow && pageErrors.length === 0;
      console.log(`${key}: ${result.labeled}/${result.nodes} labels; misaligned=${result.misaligned}; foreignObject=${result.embeddedHtml}; pageOverflow=${result.pageOverflow}`);
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
