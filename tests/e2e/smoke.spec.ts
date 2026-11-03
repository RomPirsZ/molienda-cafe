import { test, expect } from '@playwright/test';

test('la página carga en español con su título', async ({ page }) => {
  const respuesta = await page.goto('/');
  expect(respuesta?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page).toHaveTitle(/Molienda/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Molienda');
});
