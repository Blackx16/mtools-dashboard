import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = '/home/laptup/.gemini/antigravity-cli/brain/86067f53-dcdb-4592-bb11-554b75022e6b/screenshots';
const PORT = 4175;
const BASE_URL = `http://localhost:${PORT}`;
const DIST_DIR = path.resolve(process.cwd(), 'demo-dashboard', 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function createStaticServer() {
  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || !path.extname(reqPath)) {
      reqPath = '/index.html';
    }
    const filePath = path.join(DIST_DIR, reqPath);
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        // Fallback to index.html for SPA routing
        fs.readFile(path.join(DIST_DIR, 'index.html'), (err2, indexContent) => {
          if (err2) {
            res.writeHead(404);
            res.end('Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexContent, 'utf-8');
          }
        });
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`✅ Built-in static server listening on ${BASE_URL}`);
      resolve(server);
    });
  });
}

async function runQA() {
  const server = await createStaticServer();

  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();

    console.log('\n--- 1. Testing Initial Page Load & Top Bar ---');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Verify Authentik SSO badge is removed
    const bodyText = await page.innerText('body');
    if (bodyText.includes('Authentik SSO Protected')) {
      throw new Error('Found lingering "Authentik SSO Protected" text in page');
    }
    console.log('✅ "Authentik SSO Protected" is completely removed');

    // Verify Alert Banner appears for X rate-limited
    const alertBanner = page.locator('#channel-alert-banner');
    await alertBanner.waitFor({ state: 'visible' });
    const alertText = await alertBanner.innerText();
    console.log(`Alert Banner text: "${alertText}"`);
    if (!alertText.includes('X is rate-limited, data may be delayed')) {
      throw new Error(`Unexpected alert banner text: ${alertText}`);
    }
    console.log('✅ Degraded channel alert correctly displayed');

    // Verify exactly 4 clean Hero KPI cards
    const kpiSection = page.locator('#hero-kpis');
    const kpiCards = kpiSection.locator('div.grid > div');
    const count = await kpiCards.count();
    console.log(`Found ${count} Hero KPI cards`);
    if (count !== 4) {
      throw new Error(`Expected exactly 4 KPI cards, got ${count}`);
    }
    const kpiText = await kpiSection.innerText();
    console.log('Hero KPIs content:\n' + kpiText);
    if (!kpiText.includes('Reach') || !kpiText.includes('Engagements') || !kpiText.includes('Engagement rate') || !kpiText.includes('Followers gained')) {
      throw new Error('Missing expected marketer KPI labels');
    }
    console.log('✅ Exactly 4 clean marketer KPI cards verified');

    // Verify Trend Chart
    const trendSection = page.locator('#longitudinal-charts');
    const trendText = await trendSection.innerText();
    if (!trendText.includes('Trend')) {
      throw new Error('Expected chart title to be "Trend"');
    }
    if (trendText.includes('72-Hour Velocity') || trendText.includes('time-series normalization')) {
      throw new Error('Found lingering velocity/system text in Trend chart');
    }
    console.log('✅ Streamlined "Trend" chart verified');

    // Verify "By channel" Comparison Table
    const channelSection = page.locator('#channel-comparison-section');
    await channelSection.waitFor({ state: 'visible' });
    const channelRows = channelSection.locator('tbody tr');
    const channelCount = await channelRows.count();
    console.log(`Found ${channelCount} channel rows in comparison table`);
    if (channelCount !== 4) {
      throw new Error(`Expected 4 channel rows, got ${channelCount}`);
    }
    const tableText = await channelSection.innerText();
    if (!tableText.includes('LinkedIn') || !tableText.includes('X') || !tableText.includes('Instagram') || !tableText.includes('Facebook')) {
      throw new Error('Missing channel rows in comparison table');
    }
    if (!tableText.includes('Total')) {
      throw new Error('Missing Total row in comparison table');
    }
    console.log('✅ "By channel" comparison table verified with Total row');

    // Verify clicking a channel row filters the posts table
    console.log('\n--- 2. Testing Channel Row Click Interaction ---');
    await channelRows.nth(0).click(); // Click LinkedIn
    await page.waitForTimeout(300);
    const activeBadge = page.locator('text=Filtering posts by linkedin');
    if (!(await activeBadge.isVisible())) {
      throw new Error('Expected active channel filter indicator after clicking channel row');
    }
    console.log('✅ Channel row click successfully activated post filtering');

    // Capture Full Dashboard Screenshot
    await page.screenshot({ path: `${SCREENSHOT_DIR}/marketer-dashboard.png`, fullPage: false });
    console.log(`📸 Screenshot saved: ${SCREENSHOT_DIR}/marketer-dashboard.png`);

    // Verify Compare accordion is collapsed by default
    console.log('\n--- 3. Testing Compare Accordion ---');
    const compareBody = page.locator('#compare-accordion-body');
    const isBodyVisibleInitially = await compareBody.isVisible();
    if (isBodyVisibleInitially) {
      throw new Error('Expected Compare engine to be collapsed by default');
    }
    console.log('✅ Compare engine is collapsed by default');

    // Click to expand Compare
    const compareBtn = page.locator('#compare-accordion-btn');
    await compareBtn.click();
    await page.waitForTimeout(300);
    if (!(await compareBody.isVisible())) {
      throw new Error('Expected Compare engine to expand on click');
    }
    console.log('✅ Compare engine expands smoothly');
    await page.screenshot({ path: `${SCREENSHOT_DIR}/marketer-dashboard-compare-expanded.png`, fullPage: false });

    // Verify Post row click opens modal
    console.log('\n--- 4. Testing Post Row Click to Modal ---');
    const firstPostRow = page.locator('#content-performance-section tbody tr').first();
    await firstPostRow.click();
    await page.waitForTimeout(300);
    const modalTitle = page.locator('text=Post Details');
    await modalTitle.waitFor({ state: 'visible' });
    const modalText = await page.locator('.fixed.inset-0.z-50').innerText();
    if (modalText.includes('Tier 1 Provenance') || modalText.includes('Platform Direct (Live API)')) {
      throw new Error('Found lingering engineer provenance text in Post Details modal');
    }
    console.log('✅ Post modal opened with clean marketer copy');
    await page.screenshot({ path: `${SCREENSHOT_DIR}/marketer-dashboard-post-modal.png`, fullPage: false });

    // Close modal
    await page.locator('button:has-text("Done")').click();
    await page.waitForTimeout(200);

    console.log('\n🎉 ALL MARKETER DASHBOARD TESTS PASSED SUCCESSFULLY! 🎉\n');

    await browser.close();
  } finally {
    server.close();
  }
}

runQA().catch((err) => {
  console.error('❌ QA Test Failed:', err);
  process.exit(1);
});
