// Tarjetas de producto (cambio del 2026-11-03): con ratón se elevan y muestran una
// sombra. Solo se anima transform (la tarjeta) y opacity (la sombra): constitución II.
import { test, expect, type Locator } from '@playwright/test';

const sombra = (tarjeta: Locator) => tarjeta.evaluate((el) => getComputedStyle(el, '::after').opacity);
const elevacion = (tarjeta: Locator) => tarjeta.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m42);

test('cada producto de la carta y del primer viewport es una tarjeta redondeada', async ({ page }) => {
  await page.goto('/');
  const tarjetas = page.locator('.plato, .hero-cafe');
  await expect(tarjetas.first()).toBeVisible();
  for (const t of await tarjetas.all()) {
    expect(await t.evaluate((el) => el.classList.contains('tarjeta'))).toBe(true);
    expect(parseFloat(await t.evaluate((el) => getComputedStyle(el).borderTopLeftRadius))).toBeGreaterThan(0);
  }
});

test('con ratón, la tarjeta se eleva y aparece la sombra', async ({ page, isMobile }) => {
  test.skip(isMobile, 'En táctil no hay hover');
  await page.goto('/#carta');
  const plato = page.locator('.plato').first();
  expect(await sombra(plato)).toBe('0');
  await plato.hover();
  await expect.poll(() => sombra(plato)).toBe('1');
  await expect.poll(() => elevacion(plato)).toBeLessThan(0);
});

test.describe('con movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' });
  test('la sombra aparece pero la tarjeta no se mueve', async ({ page, isMobile }) => {
    test.skip(isMobile, 'En táctil no hay hover');
    await page.goto('/#carta');
    const plato = page.locator('.plato').first();
    await plato.hover();
    await expect.poll(() => sombra(plato)).toBe('1');
    expect(await elevacion(plato)).toBe(0);
  });
});

test('cada producto muestra su foto, cargada y con texto alternativo', async ({ page }) => {
  await page.goto('/');
  const tarjetas = page.locator('.plato, .hero-cafe');
  expect(await tarjetas.count()).toBe(16); // 13 de la carta + 3 del primer viewport
  for (const t of await tarjetas.all()) {
    const img = t.locator('img[data-miniatura]');
    await img.scrollIntoViewIfNeeded();
    await expect(img).toHaveAttribute('alt', /\S{4,}/);
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
});
