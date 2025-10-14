import { test, expect } from '@playwright/test';

test.describe('Cohort Builder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/create-strategy');
    await expect(page.locator('h1')).toContainText('Create Custom Strategy');
  });

  test('should load the create strategy page', async ({ page }) => {
    // Check header elements
    await expect(page.locator('text=Create Custom Strategy')).toBeVisible();
    await expect(page.locator('text=Define your transformation goals')).toBeVisible();

    // Check main sections
    await expect(page.locator('text=Strategy Details')).toBeVisible();
    await expect(page.locator('text=Start Audience')).toBeVisible();
    await expect(page.locator('text=End Audience')).toBeVisible();
    await expect(page.locator('text=Transformation Timeline')).toBeVisible();
    await expect(page.locator('text=Audience Preview & Estimates')).toBeVisible();
  });

  test('should allow entering strategy name and description', async ({ page }) => {
    const strategyName = 'Weekend to Weekday Shoppers';
    const description = 'Convert weekend shoppers to weekday shoppers to increase mid-week revenue';

    await page.fill('input[placeholder*="Weekend Shoppers"]', strategyName);
    await page.fill('textarea[placeholder*="transformation aims"]', description);

    await expect(page.locator(`input[value="${strategyName}"]`)).toBeVisible();
    await expect(page.locator(`textarea >> text="${description}"`)).toBeVisible();
  });

  test('should add and configure start audience rules', async ({ page }) => {
    // Find the first Start Audience rule row
    const startSection = page.locator('text=Start Audience').locator('..').locator('..');

    // Select property
    await startSection.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'Channel Preference' }).click();

    // Select operator
    await startSection.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'equals' }).click();

    // Select value
    await startSection.getByRole('combobox').nth(2).click();
    await page.getByRole('option', { name: 'Offline' }).click();

    // Verify selections
    await expect(startSection.getByText('Channel Preference')).toBeVisible();
    await expect(startSection.getByText('equals')).toBeVisible();
    await expect(startSection.getByText('Offline')).toBeVisible();
  });

  test('should add additional rules to a group', async ({ page }) => {
    const startSection = page.locator('text=Start Audience').locator('..').locator('..');

    // Add a new rule
    await startSection.getByRole('button', { name: /Add Rule/i }).click();

    // Verify second rule row exists
    const ruleRows = startSection.locator('[class*="space-y-3"]').first().locator('> div');
    await expect(ruleRows).toHaveCount(2);
  });

  test('should support AND/OR logic operators', async ({ page }) => {
    const startSection = page.locator('text=Start Audience').locator('..').locator('..');

    // Check default is AND
    await expect(startSection.getByRole('combobox', { name: /ALL|ANY/ }).first()).toContainText('ALL');

    // Change to OR
    await startSection.getByRole('combobox', { name: /ALL|ANY/ }).first().click();
    await page.getByRole('option', { name: 'ANY' }).click();

    await expect(startSection.getByRole('combobox', { name: /ALL|ANY/ }).first()).toContainText('ANY');
  });

  test('should add nested rule groups', async ({ page }) => {
    const startSection = page.locator('text=Start Audience').locator('..').locator('..');

    // Add a nested group
    await startSection.getByRole('button', { name: /Add Group/i }).click();

    // Verify nested group exists with different border color
    const nestedGroups = startSection.locator('[class*="border-l-4"]');
    await expect(nestedGroups).toHaveCount(2); // Root + 1 nested
  });

  test('should configure timeline', async ({ page }) => {
    // Set duration
    await page.fill('input[placeholder="Enter duration"]', '6');

    // Set unit
    await page.getByRole('combobox', { name: /Days|Weeks|Months/ }).click();
    await page.getByRole('option', { name: 'Months' }).click();

    // Verify timeline summary
    await expect(page.locator('text=6 months')).toBeVisible();
  });

  test('should show cohort preview with estimated counts', async ({ page }) => {
    // Fill in start audience rule to trigger preview calculation
    const startSection = page.locator('text=Start Audience').locator('..').locator('..');
    await startSection.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'Online Orders Count' }).click();

    await startSection.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'greater than' }).click();

    await startSection.getByPlaceholder('Enter number').fill('5');

    // Wait for preview to update
    await page.waitForTimeout(1000);

    // Check preview section
    await expect(page.locator('text=Audience Preview & Estimates')).toBeVisible();
    await expect(page.locator('text=Start Audience Size')).toBeVisible();
    await expect(page.locator('text=Expected Conversions')).toBeVisible();
    await expect(page.locator('text=Predicted Success Rate')).toBeVisible();
  });

  test('should handle different property types correctly', async ({ page }) => {
    const startSection = page.locator('text=Start Audience').locator('..').locator('..');

    // Test number property
    await startSection.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'Total Spend' }).click();

    await startSection.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'greater than' }).click();

    // Should show number input
    await expect(startSection.getByPlaceholder('Enter amount in ₹')).toBeVisible();

    // Add another rule for boolean type
    await startSection.getByRole('button', { name: /Add Rule/i }).click();

    const secondRule = startSection.locator('[class*="space-y-3"]').first().locator('> div').nth(1);
    await secondRule.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'VIP Status' }).click();

    await secondRule.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'is true' }).click();

    // Should show checkbox
    await expect(secondRule.getByRole('checkbox')).toBeVisible();
  });

  test('should handle between operator with range inputs', async ({ page }) => {
    const startSection = page.locator('text=Start Audience').locator('..').locator('..');

    await startSection.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'Average Order Value' }).click();

    await startSection.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'between' }).click();

    // Should show two inputs for min and max
    await expect(startSection.getByPlaceholder('Min')).toBeVisible();
    await expect(startSection.getByPlaceholder('Max')).toBeVisible();

    // Fill range
    await startSection.getByPlaceholder('Min').fill('1000');
    await startSection.getByPlaceholder('Max').fill('5000');
  });

  test('should remove rules when delete button clicked', async ({ page }) => {
    const startSection = page.locator('text=Start Audience').locator('..').locator('..');

    // Add a second rule
    await startSection.getByRole('button', { name: /Add Rule/i }).click();

    const ruleRows = startSection.locator('[class*="space-y-3"]').first().locator('> div');
    await expect(ruleRows).toHaveCount(2);

    // Remove second rule
    await ruleRows.nth(1).getByRole('button', { name: '' }).click(); // Delete button

    // Should be back to 1 rule
    await expect(ruleRows).toHaveCount(1);
  });

  test('should create strategy with complete data', async ({ page }) => {
    // Fill strategy details
    await page.fill('input[placeholder*="Weekend Shoppers"]', 'Test Strategy');
    await page.fill('textarea[placeholder*="transformation aims"]', 'Test Description');

    // Configure start audience
    const startSection = page.locator('text=Start Audience').locator('..').locator('..');
    await startSection.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'Channel Preference' }).click();
    await startSection.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'equals' }).click();
    await startSection.getByRole('combobox').nth(2).click();
    await page.getByRole('option', { name: 'Offline' }).click();

    // Configure end audience
    const endSection = page.locator('text=End Audience').locator('..').locator('..');
    await endSection.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'Channel Preference' }).click();
    await endSection.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'equals' }).click();
    await endSection.getByRole('combobox').nth(2).click();
    await page.getByRole('option', { name: 'Online' }).click();

    // Set timeline
    await page.fill('input[placeholder="Enter duration"]', '10');

    // Create strategy
    await page.getByRole('button', { name: /Create Strategy/i }).click();

    // Should show success message
    await expect(page.locator('text=Strategy Created Successfully')).toBeVisible();

    // Should redirect to dashboard
    await page.waitForURL('/');
    await expect(page.locator('h1')).toContainText('Customer Potential & Activation');
  });

  test('should show AI recommendation based on conversion rate', async ({ page }) => {
    // Fill in rules to get a preview
    const startSection = page.locator('text=Start Audience').locator('..').locator('..');
    await startSection.getByRole('combobox').first().click();
    await page.getByRole('option', { name: 'Online Orders Count' }).click();
    await startSection.getByRole('combobox').nth(1).click();
    await page.getByRole('option', { name: 'greater than' }).click();
    await startSection.getByPlaceholder('Enter number').fill('10');

    // Wait for preview to calculate
    await page.waitForTimeout(1000);

    // Should show AI recommendation
    await expect(page.locator('text=AI Recommendation')).toBeVisible();
  });

  test('should display property categories in dropdown', async ({ page }) => {
    const startSection = page.locator('text=Start Audience').locator('..').locator('..');

    // Open property dropdown
    await startSection.getByRole('combobox').first().click();

    // Verify categories are shown
    await expect(page.locator('text=User Properties')).toBeVisible();
    await expect(page.locator('text=Behavioral Properties')).toBeVisible();
    await expect(page.locator('text=Transactional Properties')).toBeVisible();
  });
});
