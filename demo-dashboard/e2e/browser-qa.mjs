import { chromium } from 'playwright';
import { spawn } from 'child_process';
import http from 'http';
import path from 'path';

const SCREENSHOT_DIR = '/home/laptup/.gemini/antigravity-cli/brain/f5d4d33b-a187-456a-a4dd-eb87f6b8ff84/screenshots';
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          setTimeout(check, 250);
        }
      }).on('error', () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timeout waiting for server at ${url}`));
        } else {
          setTimeout(check, 250);
        }
      });
    };
    check();
  });
}

async function runQA() {
  console.log('🚀 Starting Vite preview server...');
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--host'], {
    cwd: path.resolve(process.cwd()),
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => process.stdout.write(`[vite] ${d}`));
  server.stderr.on('data', (d) => process.stderr.write(`[vite err] ${d}`));

  try {
    await waitForServer(BASE_URL);
    console.log(`✅ Server is up at ${BASE_URL}`);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 950 },
    });
    const page = await context.newPage();

    // Prevent auto-launching tour on initial visit so clean tests can run
    await page.addInitScript(() => {
      localStorage.setItem('mtools_tour_completed', 'true');
    });

    console.log('\n--- TEST 1: Initial Page Load & All Platforms Selection ---');
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Close any tour modal if visible
    const closeTourBtn = page.locator('button[title="Close Tour"]');
    if (await closeTourBtn.isVisible()) {
      await closeTourBtn.click();
      await page.waitForTimeout(300);
    }

    // Verify Platform Dropdown Label shows "All 4 Platforms"
    const dropdownBtn = page.locator('#platform-dropdown-btn');
    await dropdownBtn.waitFor({ state: 'visible' });
    const labelText = await dropdownBtn.innerText();
    console.log(`Dropdown Button Text: "${labelText.trim()}"`);
    if (!labelText.includes('All 4 Platforms')) {
      throw new Error(`Expected dropdown to display "All 4 Platforms", got "${labelText}"`);
    }

    // Verify all 4 tab buttons exist in Platform-Specific Telemetry
    const telemetrySection = page.locator('#platform-telemetry');
    await telemetrySection.waitFor({ state: 'visible' });
    const tabContainer = page.locator('#telemetry-tabs-container');
    await tabContainer.waitFor({ state: 'visible' });
    const tabs = await tabContainer.locator('button').allInnerTexts();
    console.log('Telemetry Tabs found:', tabs.map((t) => t.split('\n')[0]));
    if (tabs.length !== 4) {
      throw new Error(`Expected 4 telemetry tabs, got ${tabs.length}`);
    }

    // Verify default Hero KPI Gross Impressions = 184,520
    const heroKpis = page.locator('#hero-kpis');
    const heroText = await heroKpis.innerText();
    if (!heroText.includes('184,520')) {
      throw new Error('Expected Hero KPIs to display 184,520 Gross Impressions');
    }
    console.log('✅ Default Hero Impressions verified: 184,520');

    await page.screenshot({ path: `${SCREENSHOT_DIR}/qa-1-all-platforms.png`, fullPage: false });
    console.log('📸 Screenshot saved: qa-1-all-platforms.png');

    console.log('\n--- TEST 2: Single Platform Selection & Tab Cutoff ---');
    // Open platform dropdown
    await dropdownBtn.click();
    await page.waitForSelector('#platform-dropdown-menu', { state: 'visible' });

    // Uncheck X, Instagram, Facebook -> leave only LinkedIn checked
    console.log('Unchecking X (Twitter)...');
    await page.click('#platform-toggle-x');
    console.log('Unchecking Instagram...');
    await page.click('#platform-toggle-instagram');
    console.log('Unchecking Facebook...');
    await page.click('#platform-toggle-facebook');

    // Close dropdown
    await dropdownBtn.click();
    await page.waitForTimeout(300);

    // Verify Dropdown label is "LinkedIn Only"
    const singleLabel = await dropdownBtn.innerText();
    console.log(`Dropdown Button Text: "${singleLabel.trim()}"`);
    if (!singleLabel.includes('LinkedIn Only')) {
      throw new Error(`Expected "LinkedIn Only", got "${singleLabel}"`);
    }

    // Verify Tab Container (#telemetry-tabs-container) is CUT OFF / NOT PRESENT
    const tabsContainerVisible = await page.locator('#telemetry-tabs-container').isVisible();
    console.log(`Is Telemetry Tab Row Visible?: ${tabsContainerVisible}`);
    if (tabsContainerVisible) {
      throw new Error('Tabs navigation bar was expected to be cut off / hidden when 1 platform is selected!');
    }
    console.log('✅ Telemetry Tab Row is completely cut off / hidden!');

    // Verify direct LinkedIn telemetry cards are displayed
    const telemetryText = await telemetrySection.innerText();
    if (!telemetryText.includes('Member Impressions') || !telemetryText.includes('648,200')) {
      throw new Error('Expected direct LinkedIn metrics cards (Member Impressions: 648,200) to render');
    }
    console.log('✅ Direct LinkedIn metrics rendered cleanly without tab bar');

    // Verify dynamic Hero KPI recalculation: LinkedIn impressions = 68,200
    const updatedHeroText = await heroKpis.innerText();
    if (!updatedHeroText.includes('68,200')) {
      throw new Error(`Expected Hero KPI to dynamically show 68,200 impressions, got:\n${updatedHeroText}`);
    }
    console.log('✅ Hero KPI dynamically recalculated to LinkedIn totals: 68,200 impressions');

    await page.screenshot({ path: `${SCREENSHOT_DIR}/qa-2-single-platform-cutoff.png`, fullPage: false });
    console.log('📸 Screenshot saved: qa-2-single-platform-cutoff.png');

    console.log('\n--- TEST 3: Guard Preventing Empty Selection ---');
    // Open dropdown again
    await dropdownBtn.click();
    await page.waitForSelector('#platform-dropdown-menu', { state: 'visible' });

    // Attempt to click LinkedIn (the last active platform)
    console.log('Attempting to uncheck the only active platform (LinkedIn)...');
    await page.click('#platform-toggle-linkedin');
    await page.waitForTimeout(200);

    // Verify LinkedIn remains checked and active
    const linkedinToggle = page.locator('#platform-toggle-linkedin');
    const linkedinText = await linkedinToggle.innerText();
    if (!linkedinText.includes('(Required)')) {
      throw new Error('Expected Required badge on last remaining platform');
    }
    const finalSingleLabel = await dropdownBtn.innerText();
    if (!finalSingleLabel.includes('LinkedIn Only')) {
      throw new Error('LinkedIn should remain selected; guard failed');
    }
    console.log('✅ Guard successfully prevented deselecting the final platform');

    await page.screenshot({ path: `${SCREENSHOT_DIR}/qa-3-guard-prevent-empty.png`, fullPage: false });
    console.log('📸 Screenshot saved: qa-3-guard-prevent-empty.png');

    console.log('\n--- TEST 4: Multi-Platform Subset Selection & Filtered Tabs ---');
    // Check Instagram
    console.log('Checking Instagram...');
    await page.click('#platform-toggle-instagram');
    await dropdownBtn.click();
    await page.waitForTimeout(300);

    // Verify Dropdown label is "2 Platforms"
    const twoPlatLabel = await dropdownBtn.innerText();
    console.log(`Dropdown Button Text: "${twoPlatLabel.trim()}"`);
    if (!twoPlatLabel.includes('2 Platforms')) {
      throw new Error(`Expected "2 Platforms", got "${twoPlatLabel}"`);
    }

    // Verify Tab Container reappeared with exactly 2 buttons (LinkedIn and Instagram)
    const tabsContainerVisibleNow = await page.locator('#telemetry-tabs-container').isVisible();
    if (!tabsContainerVisibleNow) {
      throw new Error('Expected tabs container to reappear for 2 platforms');
    }
    const multiTabs = await page.locator('#telemetry-tabs-container button').allInnerTexts();
    const tabNames = multiTabs.map((t) => t.split('\n')[0].trim());
    console.log('Telemetry Tabs found:', tabNames);
    if (tabNames.length !== 2 || !tabNames.includes('LinkedIn') || !tabNames.includes('Instagram')) {
      throw new Error(`Expected exactly [LinkedIn, Instagram], got ${JSON.stringify(tabNames)}`);
    }
    // Verify X and Facebook buttons are absent
    if (tabNames.some((n) => n.includes('X') || n.includes('Facebook'))) {
      throw new Error('Unselected platforms (X/Facebook) should NOT be present in tab bar');
    }
    console.log('✅ Tab bar contains strictly the checked platforms (LinkedIn + Instagram)');

    // Click Instagram tab and verify Instagram metrics display
    await page.click('#telemetry-tab-instagram');
    await page.waitForTimeout(200);
    const igTelemetryText = await telemetrySection.innerText();
    if (!igTelemetryText.includes('Accounts Reached') || !igTelemetryText.includes('284,000')) {
      throw new Error('Expected Instagram metrics (Accounts Reached: 284,000) after clicking Instagram tab');
    }
    console.log('✅ Switching between filtered tabs works seamlessly');

    // Verify dynamic Hero KPI recalculation: 68,200 + 42,320 = 110,520
    const twoPlatHero = await heroKpis.innerText();
    if (!twoPlatHero.includes('110,520')) {
      throw new Error(`Expected 110,520 impressions for LinkedIn + Instagram, got:\n${twoPlatHero}`);
    }
    console.log('✅ Dynamic Hero KPIs updated to combined 110,520 impressions');

    await page.screenshot({ path: `${SCREENSHOT_DIR}/qa-4-filtered-tabs.png`, fullPage: false });
    console.log('📸 Screenshot saved: qa-4-filtered-tabs.png');

    console.log('\n--- TEST 5: Reset All Button ---');
    await dropdownBtn.click();
    await page.waitForSelector('#platform-reset-btn', { state: 'visible' });
    await page.click('#platform-reset-btn');
    await dropdownBtn.click();
    await page.waitForTimeout(300);

    const resetLabel = await dropdownBtn.innerText();
    console.log(`Dropdown Button Text after Reset: "${resetLabel.trim()}"`);
    if (!resetLabel.includes('All 4 Platforms')) {
      throw new Error(`Expected "All 4 Platforms" after reset, got "${resetLabel}"`);
    }
    const resetTabsCount = await page.locator('#telemetry-tabs-container button').count();
    if (resetTabsCount !== 4) {
      throw new Error(`Expected 4 tabs after reset, got ${resetTabsCount}`);
    }
    console.log('✅ Reset All restored all 4 platforms and tabs');

    await page.screenshot({ path: `${SCREENSHOT_DIR}/qa-5-reset-all.png`, fullPage: false });
    console.log('📸 Screenshot saved: qa-5-reset-all.png');

    console.log('\n--- TEST 6: Walkthrough Tour Verification ---');
    // Click Tour button in header
    const tourBtn = page.locator('button[title="Take the Interactive Walkthrough Tour"]');
    await tourBtn.click();
    await page.waitForSelector('#tour-modal', { state: 'visible', timeout: 5000 });

    // Step 1: Brand Switcher
    const step1Badge = await page.locator('#tour-modal').innerText();
    if (!step1Badge.includes('Step 1 of 9')) {
      throw new Error(`Expected "Step 1 of 9", got:\n${step1Badge}`);
    }
    console.log('✅ Tour Step 1 of 9 confirmed');

    // Next -> Step 2: Date & Multi-Platform Checkbox Filters
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(200);
    const step2Text = await page.locator('#tour-modal').innerText();
    if (!step2Text.includes('Step 2 of 9') || !step2Text.includes('Multi-Platform Checkbox Filters')) {
      throw new Error(`Expected updated Step 2 of 9 with Multi-Platform filters, got:\n${step2Text}`);
    }
    console.log('✅ Tour Step 2 of 9 updated content verified');

    // Navigate to Step 8: Adaptive Platform-Specific Telemetry
    for (let i = 2; i < 8; i++) {
      await page.click('button:has-text("Next")');
      await page.waitForTimeout(200);
    }
    const step8Text = await page.locator('#tour-modal').innerText();
    if (!step8Text.includes('Step 8 of 9') || !step8Text.includes('Adaptive Platform-Specific Telemetry')) {
      throw new Error(`Expected Step 8 of 9 to highlight Adaptive Platform-Specific Telemetry, got:\n${step8Text}`);
    }
    console.log('✅ Tour Step 8 of 9 Adaptive Telemetry verified');

    await page.screenshot({ path: `${SCREENSHOT_DIR}/qa-6-tour-telemetry-step.png`, fullPage: false });
    console.log('📸 Screenshot saved: qa-6-tour-telemetry-step.png');

    await browser.close();
    console.log('\n🎉 ALL 6 BROWSER QA TEST SUITES PASSED FLAWLESSLY!');
  } finally {
    server.kill('SIGTERM');
  }
}

runQA().catch((err) => {
  console.error('\n❌ BROWSER QA FAILED:', err);
  process.exit(1);
});
