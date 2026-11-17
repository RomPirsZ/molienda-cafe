// E2E 3 del plan §8 (constitución II): con movimiento reducido no se anima nada y el
// módulo de animaciones (GSAP, Lenis) ni siquiera se descarga.
import { test, expect } from '@playwright/test';

test.use({ reducedMotion: 'reduce' });

test('nada se anima, nada queda oculto y GSAP no se descarga', async ({ page }) => {
  const modulos: string[] = [];
  page.on('request', (r) => {
    if (/\/_astro\/animations\.[^/]+\.js$/.test(r.url())) modulos.push(r.url());
  });
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveClass(/\b(motion|motion-ready|lenis)\b/);
  // Los títulos no se parten en líneas (SplitText no se ejecuta)
  expect(await page.locator('h2[data-revelar] div').count()).toBe(0);

  // Recorrido completo: la cabecera no se mueve y todo está visible
  for (let y = 0; y < 6000; y += 700) {
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(60);
  }
  await page.waitForLoadState('networkidle');
  expect(await page.evaluate(() => document.getAnimations().length)).toBe(0);
  expect(await page.locator('[data-cabecera]').evaluate((el) => getComputedStyle(el).transform)).toBe('none');
  for (const el of await page.locator('[data-foto], [data-revelar]').all()) {
    expect(await el.evaluate((e) => getComputedStyle(e).opacity)).toBe('1');
  }
  expect(modulos).toEqual([]);
});
