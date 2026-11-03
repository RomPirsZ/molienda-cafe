// E2E 4 del plan §8 (constitución III): todo se recorre con el teclado y el foco se ve.
import { test, expect } from '@playwright/test';
import es from '../../src/i18n/es.json' with { type: 'json' };

test('el primer Tab muestra «Saltar al contenido» y lleva al contenido', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const saltar = page.getByRole('link', { name: es['nav.saltar'] });
  await expect(saltar).toBeFocused();
  await expect(saltar).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#contenido$/);
});

test('la navegación y la acción principal se alcanzan con Tab y tienen foco visible', async ({ page }) => {
  await page.goto('/');
  const destinos = [es['nav.inicio'], es['nav.carta'], es['nav.origen'], es['nav.visitanos'], es['hero.cta']];
  const alcanzados: string[] = [];
  for (let i = 0; i < 12 && alcanzados.length < destinos.length; i++) {
    await page.keyboard.press('Tab');
    const nombre = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      return el?.getAttribute('aria-label') ?? el?.textContent?.trim() ?? '';
    });
    const destino = destinos.find((d) => nombre.startsWith(d));
    if (destino && !alcanzados.includes(destino)) {
      alcanzados.push(destino);
      const contorno = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
      expect(contorno, `foco visible en «${destino}»`).not.toBe('none');
    }
  }
  expect(alcanzados).toEqual(destinos);
});

test('los enlaces de la cabecera llevan a su sección', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: es['nav.etiqueta'] }).getByRole('link', { name: es['nav.visitanos'] }).click();
  await expect(page).toHaveURL(/#visitanos$/);
  await expect(page.getByRole('heading', { name: es['visitanos.titulo'], level: 2 })).toBeInViewport();
});
