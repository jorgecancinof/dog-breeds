import { test, expect } from '@playwright/test';

const BREED = 'hound';
const SUB_BREED = 'plott';
const TIMEOUT = 2000;

/**
 * This test addresses a Masonic library error that occurs when switching between
 * breeds/sub-breeds with different image counts. The error ("No data was found at index: X")
 * happens when the "items" array becomes shorter than its previous state.
 */
test.describe('Breed image gallery', () => {
  test('should display images based on breed and sub-breed selection', async ({ page }) => {
    await page.goto('/');
    const breedInput = page.getByTestId('breed-input');
    const subBreedInput = page.getByTestId('subbreed-input');

    await test.step('Select breed and verify images', async () => {
      await breedInput.click();
      await page.getByTestId(`breed-option-${BREED}`).click();

      await expect(breedInput).toHaveValue(BREED);
      await expect(page.getByTestId(`breed-option-${BREED}`)).toBeHidden();
      await expect(page.locator(`[data-breed="${BREED}"]`).first()).toBeVisible({ timeout: TIMEOUT });
    });

    await test.step('Select sub-breed and verify images', async () => {
      await subBreedInput.click();
      await page.getByTestId(`subbreed-option-${SUB_BREED}`).click();

      await expect(subBreedInput).toHaveValue(SUB_BREED);
      await expect(page.getByTestId(`subbreed-option-${SUB_BREED}`)).toBeHidden();
      await expect(page.locator(`[data-breed="${BREED}"][data-sub-breed="${SUB_BREED}"]`).first()).toBeVisible({ timeout: TIMEOUT });
    });

    await test.step('Clear sub-breed and verify breed images', async () => {
      await page.getByTestId('subbreed-clear-button').click();

      await expect(subBreedInput).toBeEmpty();
      await expect(page.locator(`[data-breed="${BREED}"]`).first()).toBeVisible({ timeout: TIMEOUT });
    });

    await test.step('Reselect sub-breed and verify images', async () => {
      await subBreedInput.click();
      await page.getByTestId(`subbreed-option-${SUB_BREED}`).click();

      await expect(subBreedInput).toHaveValue(SUB_BREED);
      await expect(page.locator(`[data-breed="${BREED}"][data-sub-breed="${SUB_BREED}"]`).first()).toBeVisible({ timeout: TIMEOUT });
    });

    await test.step('Verify multiple images are loaded', async () => {
      const images = await page.$$(`[data-breed="${BREED}"][data-sub-breed="${SUB_BREED}"]`);
      expect(images.length).toBeGreaterThan(0);
    });
  });
});
