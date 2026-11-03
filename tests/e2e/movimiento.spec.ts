// Movimiento (spec §6, plan §6): todo termina en su sitio y visible, y nada rompe la
// interacción (tarjetas, cabecera, teclado).
import { test, expect, type Page } from '@playwright/test';
import es from '../../src/i18n/es.json' with { type: 'json' };

test.use({ reducedMotion: 'no-preference' });

/** Lenis sigue desplazando un rato tras la rueda: se espera a que pare, como haría una persona. */
async function esperarQueSeDetenga(page: Page) {
  let antes = -1;
  await expect
    .poll(async () => {
      const ahora = await page.evaluate(() => scrollY);
      const quieto = ahora === antes;
      antes = ahora;
      return quieto;
    }, { intervals: [200] })
    .toBe(true);
}

const opacidad = (page: Page, selector: string) =>
  page.locator(selector).first().evaluate((el) => getComputedStyle(el).opacity);

test('el titular entra por letras y queda legible para lectores de pantalla', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/\bmotion-ready\b/);
  const h1 = page.getByRole('heading', { level: 1 });
  await expect(h1).toHaveAccessibleName(es['marca.nombre']);
  // Las letras acaban en su sitio
  await expect
    .poll(() => page.locator('h1 .letra').first().evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m42))
    .toBe(0);
});

test('al bajar, platos y fotos terminan visibles; las tarjetas siguen respondiendo al ratón', async ({ page, isMobile }) => {
  await page.goto('/');
  await page.getByRole('link', { name: es['hero.cta'] }).click();
  await expect.poll(() => opacidad(page, '#carta .plato')).toBe('1');
  // Tras la entrada no queda transform en línea que pise el hover
  const plato = page.locator('#carta .plato').first();
  await expect.poll(() => plato.evaluate((el) => el.style.transform)).toBe('');
  if (!isMobile) {
    await plato.hover();
    await expect.poll(() => plato.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m42)).toBeLessThan(0);
  }
  await page.locator('#origen [data-foto]').first().scrollIntoViewIfNeeded();
  await expect.poll(() => opacidad(page, '#origen [data-foto]')).toBe('1');
});

test('la cabecera se oculta al bajar y vuelve al subir', async ({ page }) => {
  await page.goto('/');
  const cabecera = page.locator('[data-cabecera]');
  const desplazada = () => cabecera.evaluate((el) => el.getBoundingClientRect().bottom);
  for (let i = 0; i < 6; i++) await page.mouse.wheel(0, 400);
  await expect.poll(desplazada).toBeLessThanOrEqual(1);
  await esperarQueSeDetenga(page);
  await page.mouse.wheel(0, -300);
  await expect.poll(desplazada).toBeGreaterThan(40);
});

test('con el foco en la cabecera, la cabecera está a la vista', async ({ page }) => {
  await page.goto('/');
  for (let i = 0; i < 6; i++) await page.mouse.wheel(0, 400);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  const cabecera = page.locator('[data-cabecera]');
  await expect.poll(() => cabecera.evaluate((el) => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);
});

test('en la carta, el sello de la cabecera estampa la taza y el enlace queda activo', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: es['hero.cta'] }).click();
  const taza = page.locator('[data-sello-cabecera] svg[data-variante="taza"]');
  await expect.poll(() => taza.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
  await expect(page.locator('[data-cabecera] nav a[href="#carta"]')).toHaveAttribute('aria-current', 'true');
});
