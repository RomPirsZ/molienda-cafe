// E2E 1 y 5 del plan §8: lo esencial se ve sin scroll y nada se pide fuera del sitio.
import { test, expect } from '@playwright/test';
import es from '../../src/i18n/es.json' with { type: 'json' };

test('el aviso de concepto y la carta empiezan en el primer viewport', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText(es['concepto.aviso'])).toBeInViewport();
  await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
  // El primer café de la carta, con su precio, sin hacer scroll
  const primero = page.locator('.hero-cafe').first();
  await expect(primero).toBeInViewport();
  await expect(primero).toContainText(es['plato.espresso']);
  await expect(primero).toContainText('$2,00');
});

for (const [ancho, alto] of [[1280, 720], [1366, 768], [1440, 900]] as const) {
  test(`en escritorio ${ancho}×${alto}, los tres cafés y «Ver la carta» caben sin scroll`, async ({ page, isMobile }) => {
    test.skip(isMobile, 'En el móvil la acción queda justo debajo del primer viewport');
    await page.setViewportSize({ width: ancho, height: alto });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    for (const cafe of await page.locator('.hero-cafe').all()) await expect(cafe).toBeInViewport({ ratio: 1 });
    await expect(page.getByRole('link', { name: es['hero.cta'] })).toBeInViewport({ ratio: 1 });
  });
}

test('«Ver la carta» lleva a la carta', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: es['hero.cta'] }).click();
  await expect(page).toHaveURL(/#carta$/);
  await expect(page.getByRole('heading', { name: es['carta.titulo'], level: 2 })).toBeInViewport();
});

test('con JS, el estado de apertura aparece con la hora de Mérida', async ({ page }) => {
  // Martes 10:00 en Caracas: abierto
  await page.clock.setFixedTime(new Date('2026-11-03T10:00:00-04:00'));
  await page.goto('/');
  const estado = page.locator('[data-estado]:visible').first();
  await expect(estado).toHaveText(/Abierto ahora · cierra a las 7\sp\.\sm\./);
  await expect(page.locator('[data-dia="2"]')).toHaveAttribute('aria-current', 'date');
});

test('el lunes (cerrado) el estado dice cuándo abre', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2026-11-02T12:00:00-04:00'));
  await page.goto('/');
  await expect(page.locator('[data-estado]:visible').first()).toHaveText(/Cerrado · abre mañana a las 7\sa\.\sm\./);
});

test('ninguna petición sale del propio origen', async ({ page, baseURL }) => {
  const fuera: string[] = [];
  page.on('request', (r) => {
    const url = r.url();
    if (!url.startsWith(baseURL!) && !url.startsWith('data:')) fuera.push(url);
  });
  await page.goto('/');
  // Recorre la página para que carguen las fotos diferidas
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
  });
  await page.waitForLoadState('networkidle');
  expect(fuera).toEqual([]);
});
