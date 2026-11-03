// E2E 2 del plan §8 (constitución I): sin JavaScript se lee todo, horario incluido.
import { test, expect } from '@playwright/test';
import es from '../../src/i18n/es.json' with { type: 'json' };
import { CARTA } from '../../src/data/carta';

test.use({ javaScriptEnabled: false });

test('sin JS se ven todas las secciones, la carta completa y el horario', async ({ page }) => {
  await page.goto('/');
  for (const titulo of ['carta.titulo', 'origen.titulo', 'ambiente.titulo', 'visitanos.titulo'] as const) {
    await expect(page.getByRole('heading', { name: es[titulo], level: 2 })).toBeVisible();
  }
  const total = CARTA.reduce((n, c) => n + c.platos.length, 0);
  await expect(page.locator('.plato')).toHaveCount(total);
  for (const plato of await page.locator('.plato').all()) await expect(plato).toBeVisible();
  await expect(page.locator('.horario-fila')).toHaveCount(7);
  await expect(page.locator('.horario-fila--cerrado')).toContainText(es['horario.cerrado']);
  await expect(page.getByText(es['concepto.aviso'])).toBeVisible();
});

test('sin JS el estado de apertura no aparece vacío', async ({ page }) => {
  await page.goto('/');
  for (const estado of await page.locator('[data-estado]').all()) await expect(estado).toBeHidden();
});

test('sin JS las fotos están en su sitio (nada queda oculto esperando una animación)', async ({ page }) => {
  await page.goto('/');
  for (const foto of await page.locator('[data-foto-img]').all()) {
    await foto.scrollIntoViewIfNeeded();
    await expect(foto).toBeVisible();
    expect(await foto.evaluate((img) => getComputedStyle(img).opacity)).toBe('1');
  }
});
