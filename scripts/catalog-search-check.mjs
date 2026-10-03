import assert from 'node:assert/strict';

// Run only against an already running local application; never a live catalog.
const base = new URL(process.argv[2] || 'http://localhost:3000');
if (!['http:', 'https:'].includes(base.protocol) || !['localhost', '127.0.0.1', '[::1]'].includes(base.hostname) || base.username || base.password) {
  throw new Error('Usage: node scripts/catalog-search-check.mjs <local-url>');
}
const { default: puppeteer } = await import('puppeteer-core');
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-gpu'],
  ignoreDefaultArgs: ['--disable-back-forward-cache'],
});
const quick = '#dm-home-quick-query';
const full = '#dm-home-query';
const cases = [];
const errors = [];
const catalog = () => ({
  quick: document.querySelector('#dm-home-quick-query').value,
  full: document.querySelector('#dm-home-query').value,
  area: document.querySelector('#dm-home-area').value,
  runtime: document.querySelector('#dm-home-runtime').value,
  status: document.querySelector('#resultados [role="status"]').textContent.trim(),
  results: [...document.querySelectorAll('.dm-home-catalog-groups a[data-category]')].map((card) => card.getAttribute('href')).sort(),
  empty: Boolean(document.querySelector('.dm-home-empty')),
  submittedQuick: Object.fromEntries(new FormData(document.querySelector('#dm-home-quick-query').form)),
  submittedFull: Object.fromEntries(new FormData(document.querySelector('#dm-home-query').form)),
});
const urlFor = (params = {}) => {
  const url = new URL('/', base);
  url.search = new URLSearchParams(params).toString();
  url.hash = 'resultados';
  return url.href;
};

try {
  const page = await browser.newPage();
  const reference = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await reference.setJavaScriptEnabled(false);
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.evaluateOnNewDocument(() => {
    window.__catalogPageShows = [];
    window.addEventListener('pageshow', (event) => window.__catalogPageShows.push({ persisted: event.persisted }));
  });

  async function type(selector, value) {
    await page.focus(selector);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.type(selector, value);
  }
  async function navigate(action) {
    await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle2' }), action()]);
  }
  async function check(label, params) {
    const expectedURL = new URL(urlFor(params));
    assert.equal(new URL(page.url()).pathname, expectedURL.pathname, `${label}: route`);
    assert.deepEqual([...new URL(page.url()).searchParams].sort(), [...expectedURL.searchParams].sort(), `${label}: URL parameters`);
    await reference.goto(expectedURL.href, { waitUntil: 'load' });
    const expected = await reference.evaluate(catalog);
    await page.waitForFunction((state) => {
      const q = document.querySelector('#dm-home-quick-query');
      const full = document.querySelector('#dm-home-query');
      const status = document.querySelector('#resultados [role="status"]');
      return q?.value === state.quick && full?.value === state.full && status?.textContent.trim() === state.status;
    }, { timeout: 10000 }, expected);
    assert.deepEqual(await page.evaluate(catalog), expected, `${label}: fields, submitted values and server-rendered results`);
    cases.push({ label, url: page.url(), ...expected, pageShows: await page.evaluate(() => window.__catalogPageShows) });
  }
  async function preserveDraft(label, value) {
    await type(quick, value);
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    assert.equal(await page.$eval(quick, (input) => input.value), value, label);
    cases.push({ label, draft: value });
  }

  await page.goto(urlFor({ q: 'cauce' }), { waitUntil: 'networkidle2' });
  await check('initial filtered hydration', { q: 'cauce' });
  assert.ok((await page.evaluate(catalog)).results.length > 0, 'fixture query must match at least one project');
  await preserveDraft('first unsubmitted quick edit survives', 'unsubmitted draft');
  await preserveDraft('repeated quick edit survives', 'another draft');
  await navigate(() => page.click('#resultados a'));
  await check('clear filters discards old quick draft', {});

  await type(quick, 'cauce');
  await navigate(() => page.click('.dm-home-index-search button[type="submit"]'));
  await check('quick search submits edited query', { q: 'cauce' });
  await preserveDraft('quick draft before main-form submit', 'stale quick draft');
  await type(full, 'jarvis');
  await navigate(() => page.click('.dm-home-search button[type="submit"]'));
  await check('main search replaces stale quick query', { q: 'jarvis', area: 'all', runtime: 'all' });
  await preserveDraft('draft before browser Back', 'back draft');
  await page.goBack({ waitUntil: 'networkidle2' });
  await check('Back restores the applied query', { q: 'cauce' });
  await preserveDraft('draft before browser Forward', 'forward draft');
  await page.goForward({ waitUntil: 'networkidle2' });
  await check('Forward restores the applied query', { q: 'jarvis', area: 'all', runtime: 'all' });

  await preserveDraft('draft before changing area', 'area draft');
  await page.select('#dm-home-area', 'assistants');
  await navigate(() => page.click('.dm-home-search button[type="submit"]'));
  await check('area change synchronizes quick and hidden filter', { q: 'jarvis', area: 'assistants', runtime: 'all' });
  await preserveDraft('draft before changing runtime', 'runtime draft');
  await page.select('#dm-home-runtime', 'api');
  await navigate(() => page.click('.dm-home-search button[type="submit"]'));
  await check('runtime change synchronizes quick and hidden filters', { q: 'jarvis', area: 'assistants', runtime: 'api' });
  await type(quick, '__catalog_no_matching_project__');
  await navigate(() => page.click('.dm-home-index-search button[type="submit"]'));
  await check('quick search retains area/runtime and shows empty results', { q: '__catalog_no_matching_project__', area: 'assistants', runtime: 'api' });
  assert.equal((await page.evaluate(catalog)).empty, true);
  await preserveDraft('empty-state draft', 'last stale draft');
  await navigate(() => page.click('.dm-home-empty a'));
  await check('empty-state clear restores entire catalog', {});

  // A native GET form must still work when no client JavaScript is available.
  await reference.goto(urlFor({ q: 'cauce', area: 'infrastructure', runtime: 'local-cpu' }), { waitUntil: 'load' });
  await reference.$eval(quick, (input) => { input.value = 'jarvis'; });
  await Promise.all([
    reference.waitForNavigation({ waitUntil: 'load' }),
    reference.click('.dm-home-index-search button[type="submit"]'),
  ]);
  assert.deepEqual([...new URL(reference.url()).searchParams].sort(), Object.entries({ q: 'jarvis', area: 'infrastructure', runtime: 'local-cpu' }).sort());
  assert.equal(await reference.$eval(full, (input) => input.value), 'jarvis');
  cases.push({ label: 'no-JavaScript native quick submission preserves filters', url: reference.url() });
  assert.deepEqual(errors, [], 'browser console and hydration errors');
  console.log(JSON.stringify({ passed: true, cases, errors }, null, 2));
} finally {
  await browser.close();
}
