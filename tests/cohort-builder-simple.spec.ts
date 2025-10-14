import { test, expect } from '@playwright/test';

test.describe('Cohort Builder - Core Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/create-strategy');
    await expect(page.locator('h1')).toContainText('Create Custom Strategy');
  });

  test('should display all main sections', async ({ page }) => {
    // Strategy Details
    await expect(page.getByText('Strategy Details')).toBeVisible();

    // Start Audience
    await expect(page.getByRole('heading', { name: 'Start Audience' })).toBeVisible();

    // End Audience
    await expect(page.getByRole('heading', { name: 'End Audience' })).toBeVisible();

    // Timeline
    await expect(page.getByText('Transformation Timeline')).toBeVisible();

    // Preview
    await expect(page.getByText('Audience Preview & Estimates')).toBeVisible();
  });

  test('should allow filling strategy name and description', async ({ page }) => {
    const nameInput = page.locator('input[placeholder*="Weekend Shoppers"]');
    const descInput = page.locator('textarea[placeholder*="transformation aims"]');

    await nameInput.fill('Test Strategy');
    await descInput.fill('Test Description');

    await expect(nameInput).toHaveValue('Test Strategy');
    await expect(descInput).toHaveValue('Test Description');
  });

  test('should show rule groups for start and end audience', async ({ page }) => {
    // Check for rule group cards (they have border-l-4 class)
    const ruleGroupCards = page.locator('[class*="border-l-4"]');

    // Should have at least 2 rule groups (start and end)
    await expect(ruleGroupCards).toHaveCount(2, { timeout: 10000 });
  });

  test('should display property dropdowns in rule groups', async ({ page }) => {
    // Get all comboboxes (dropdowns)
    const comboboxes = page.getByRole('combobox');

    // Should have multiple comboboxes (property, operator, value selectors + timeline selectors)
    const count = await comboboxes.count();
    expect(count).toBeGreaterThan(4);
  });

  test('should display Add Rule buttons', async ({ page }) => {
    const addRuleButtons = page.getByRole('button', { name: /Add Rule/i });

    // Should have Add Rule buttons for both start and end audience
    await expect(addRuleButtons).toHaveCount(2, { timeout: 10000 });
  });

  test('should display Add Group buttons', async ({ page }) => {
    const addGroupButtons = page.getByRole('button', { name: /Add Group/i });

    // Should have Add Group buttons for both start and end audience
    await expect(addGroupButtons).toHaveCount(2, { timeout: 10000 });
  });

  test('should show timeline selector', async ({ page }) => {
    // Check for duration input
    await expect(page.locator('input[placeholder="Enter duration"]')).toBeVisible();
  });

  test('should show preview section with metrics', async ({ page }) => {
    // Check for preview section heading first
    await expect(page.getByText('Audience Preview & Estimates')).toBeVisible();

    // Check for metric labels (more specific selectors)
    await expect(page.getByText('Start Audience Size').first()).toBeVisible();
    await expect(page.getByText('Expected Conversions').first()).toBeVisible();
    await expect(page.getByText('Predicted Success Rate').first()).toBeVisible();
    await expect(page.getByText('Estimated Opportunity Value').first()).toBeVisible();
  });

  test('should have Create Strategy button disabled when name is empty', async ({ page }) => {
    const createButton = page.getByRole('button', { name: /Create Strategy/i });
    await expect(createButton).toBeDisabled();
  });

  test('should enable Create Strategy button when name and description are filled', async ({ page }) => {
    const nameInput = page.locator('input[placeholder*="Weekend Shoppers"]');
    const descInput = page.locator('textarea[placeholder*="transformation aims"]');
    const createButton = page.getByRole('button', { name: /Create Strategy/i });

    await nameInput.fill('Test Strategy');
    await descInput.fill('Test Description');

    await expect(createButton).toBeEnabled();
  });

  test('should show Match ALL/ANY operator selector', async ({ page }) => {
    // Look for the operator selector text
    await expect(page.getByText('Match').first()).toBeVisible();
  });

  test('should display AI Journey Generation info', async ({ page }) => {
    await expect(page.getByText('AI-Powered Journey Generation')).toBeVisible();
    await expect(page.getByText('Multiple personalized paths')).toBeVisible();
  });
});
