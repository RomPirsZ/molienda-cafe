// Accesibilidad (constitución III, plan §8): cero violaciones serias o críticas de axe,
// en móvil y en escritorio (cada proyecto de Playwright). Sin JS no se puede pasar axe
// (es un script que se inyecta): la legibilidad sin JS la vigila no-js.spec.ts.
import AxeBuilder from '@axe-core/playwright';
import { test, expect, type Page } from '@playwright/test';

async function sinViolacionesSerias(page: Page) {
  const { violations } = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .analyze();
  const serias = violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
  expect(serias.map((v) => `${v.id}: ${v.help} → ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
}

test('inicio con movimiento: sin violaciones serias de axe, tras las entradas', async ({ page }) => {
  await page.goto('/');
  // axe mide el contraste: se espera a que las entradas del primer viewport terminen
  await expect(page.locator('html')).toHaveClass(/\bmotion-ready\b/);
  await expect.poll(() => page.locator('[data-luz]').last().evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
  await sinViolacionesSerias(page);
});

test('panel de secciones abierto: sin violaciones serias de axe', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-abrir-panel]').click();
  await expect(page.locator('[data-panel]')).toHaveAttribute('aria-label', /\S/);
  await expect(page.locator('[data-abrir-panel]')).toHaveAttribute('aria-expanded', 'true');
  await sinViolacionesSerias(page);
});

test.describe('con movimiento reducido', () => {
  test.use({ reducedMotion: 'reduce' });
  test('inicio estático: sin violaciones serias de axe', async ({ page }) => {
    await page.goto('/');
    await sinViolacionesSerias(page);
  });
});
