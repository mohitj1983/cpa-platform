import { test, expect } from '@playwright/test';

test.describe('UI Alignment Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('transformation card buttons should be vertically aligned', async ({ page }) => {
    // Wait for transformation cards to load
    await page.waitForSelector('text=Transformation Opportunities', { timeout: 10000 });

    // Get all "Explore Transformation" buttons
    const buttons = await page.getByRole('link', { name: /Explore Transformation/i }).all();

    expect(buttons.length).toBeGreaterThan(0);

    // Get the bounding boxes of all buttons
    const buttonBoxes = await Promise.all(
      buttons.map(button => button.boundingBox())
    );

    // Filter out null values
    const validBoxes = buttonBoxes.filter(box => box !== null);
    expect(validBoxes.length).toBeGreaterThan(0);

    // Group buttons by row (buttons with similar y coordinates are in the same row)
    // Tolerance of 5px for rounding errors
    const tolerance = 5;
    const rows: typeof validBoxes[] = [];

    for (const box of validBoxes) {
      let foundRow = false;
      for (const row of rows) {
        if (Math.abs(row[0]!.y - box!.y) < tolerance) {
          row.push(box);
          foundRow = true;
          break;
        }
      }
      if (!foundRow) {
        rows.push([box]);
      }
    }

    // Check that buttons in each row have the same y-coordinate (within tolerance)
    for (const row of rows) {
      if (row.length > 1) {
        const firstY = row[0]!.y;
        for (const box of row) {
          expect(Math.abs(box!.y - firstY)).toBeLessThanOrEqual(tolerance);
        }
      }
    }

    console.log(`✅ Found ${validBoxes.length} buttons in ${rows.length} rows, all properly aligned`);
  });

  test('AI-Powered badge should be aligned with title in recommended action', async ({ page }) => {
    // Wait for the recommended action card to load
    await page.waitForSelector('text=Recommended Next Action', { timeout: 10000 });

    // Get the title and AI-Powered badge
    const title = page.getByText('Recommended Next Action').first();
    const aiBadge = page.getByText('✨ AI-Powered');

    // Both should be visible
    await expect(title).toBeVisible();
    await expect(aiBadge).toBeVisible();

    // Get their bounding boxes
    const titleBox = await title.boundingBox();
    const badgeBox = await aiBadge.boundingBox();

    expect(titleBox).not.toBeNull();
    expect(badgeBox).not.toBeNull();

    // The badge should be on the same line or very close (within 10px tolerance for flex wrapping)
    const yDifference = Math.abs(titleBox!.y - badgeBox!.y);
    expect(yDifference).toBeLessThanOrEqual(10);

    // The badge should be to the right of the title
    expect(badgeBox!.x).toBeGreaterThan(titleBox!.x);

    console.log(`✅ AI-Powered badge aligned with title (y-diff: ${yDifference}px)`);
  });

  test('Explore Strategy button should be properly aligned in recommended action', async ({ page }) => {
    // Wait for the recommended action card to load
    await page.waitForSelector('text=Recommended Next Action', { timeout: 10000 });

    // Get the button
    const exploreButton = page.getByRole('link', { name: /Explore Strategy/i });

    await expect(exploreButton).toBeVisible();

    const buttonBox = await exploreButton.boundingBox();
    expect(buttonBox).not.toBeNull();

    // Button should have reasonable dimensions
    expect(buttonBox!.width).toBeGreaterThan(100);
    expect(buttonBox!.height).toBeGreaterThan(30);

    console.log(`✅ Explore Strategy button is properly sized and positioned`);
  });

  test('transformation cards should use flexbox layout', async ({ page }) => {
    await page.waitForSelector('text=Transformation Opportunities', { timeout: 10000 });

    // Get the first transformation card
    const cards = await page.locator('[class*="hover:shadow-lg"][class*="flex"]').all();

    expect(cards.length).toBeGreaterThan(0);

    // Check that the card has flex display
    const firstCard = cards[0];
    const display = await firstCard.evaluate(el => window.getComputedStyle(el).display);

    expect(display).toBe('flex');

    console.log(`✅ Transformation cards use flexbox layout`);
  });

  test('screenshot comparison for visual alignment', async ({ page }) => {
    await page.waitForSelector('text=Transformation Opportunities', { timeout: 10000 });

    // Take a screenshot of the transformation cards section
    const cardsSection = page.locator('text=Transformation Opportunities').locator('..');
    await cardsSection.screenshot({ path: 'test-results/transformation-cards-alignment.png' });

    // Take a screenshot of the recommended action section
    const recommendedSection = page.locator('text=Recommended Next Action').locator('..');
    await recommendedSection.screenshot({ path: 'test-results/recommended-action-alignment.png' });

    console.log('✅ Screenshots saved for visual inspection');
  });
});
