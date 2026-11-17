// Panel de secciones (spec §10.2, punto 3; §10.5): se abre y se cierra con teclado, Esc
// lo cierra y el foco vuelve al botón; cada bloque lleva a su sección.
import { test, expect } from '@playwright/test';
import es from '../../src/i18n/es.json' with { type: 'json' };
import { SECCIONES } from '../../src/data/secciones';

test('con el teclado: se abre, el foco entra en el panel, Esc lo cierra y el foco vuelve', async ({ page }) => {
  await page.goto('/');
  const boton = page.locator('[data-abrir-panel]');
  const panel = page.locator('[data-panel]');
  await boton.focus();
  await page.keyboard.press('Enter');
  await expect(panel).toBeVisible();
  await expect(boton).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('button', { name: es['panel.cerrar'] })).toBeFocused();
  // Los cinco bloques, en orden
  await expect(panel.getByRole('link')).toHaveText(SECCIONES.map((s) => new RegExp(es[s.nombre])));
  await page.keyboard.press('Escape');
  await expect(panel).toBeHidden();
  await expect(boton).toHaveAttribute('aria-expanded', 'false');
  await expect(boton).toBeFocused();
});

test('el botón «Cerrar» lo cierra', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-abrir-panel]').click();
  await page.getByRole('button', { name: es['panel.cerrar'] }).click();
  await expect(page.locator('[data-panel]')).toBeHidden();
});

test('tocar fuera de la hoja lo cierra', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-abrir-panel]').click();
  await expect(page.locator('[data-abrir-panel]')).toHaveAttribute('aria-expanded', 'true');
  await page.mouse.click(10, 300);
  await expect(page.locator('[data-panel]')).toBeHidden();
});

for (const s of SECCIONES) {
  test(`el bloque «${es[s.nombre]}» lleva a su sección y cierra el panel`, async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-abrir-panel]').click();
    await page.locator('[data-panel]').getByRole('link', { name: new RegExp(es[s.nombre]) }).click();
    await expect(page.locator('[data-panel]')).toBeHidden();
    await expect(page).toHaveURL(new RegExp(`${s.href}$`));
    await expect.poll(() => page.locator(s.href).evaluate((el) => Math.round(el.getBoundingClientRect().top))).toBeLessThan(120);
  });
}
