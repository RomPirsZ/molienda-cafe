import { test, expect } from '@playwright/test';

test('la página carga en español con su título', async ({ page }) => {
  const respuesta = await page.goto('/');
  expect(respuesta?.status()).toBe(200);
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page).toHaveTitle(/Molienda/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/Molienda.*La finca queda aquí arriba/);
});

test('las fuentes del sitio cargan desde el propio origen', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  // document.fonts.check() da true también si la fuente no existe: se mira cada FontFace
  const cargadas = await page.evaluate(() =>
    [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/"/g, '')),
  );
  expect(cargadas).toContain('Sofia Sans Extra Condensed');
  expect(cargadas).toContain('Sofia Sans');
});

test('theme-color coincide con la noche de la página', async ({ page }) => {
  // La meta no admite variables CSS: este test evita que se desincronice de --noche
  await page.goto('/');
  const fondo = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
  const meta = await page.locator('meta[name="theme-color"]').getAttribute('content');
  expect(fondo.replace(/,\s*/g, ' ')).toBe(meta);
});
