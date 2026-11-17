// «Para llevar» (spec §10.2, punto 5; §10.5): el ticket suma, se puede vaciar y no hace
// ninguna petición de red.
import { test, expect } from '@playwright/test';
import es from '../../src/i18n/es.json' with { type: 'json' };

const anadir = (plato: string) => es['paraLlevar.anadir'].replace('{plato}', plato);
const quitar = (plato: string) => es['paraLlevar.quitar'].replace('{plato}', plato);

test('se arma el ticket, suma bien, se quita y se vacía, sin peticiones', async ({ page, baseURL }) => {
  await page.goto('/#para-llevar');
  const peticiones: string[] = [];
  page.on('request', (r) => peticiones.push(r.url()));
  const ticket = page.getByRole('complementary', { name: es['ticket.titulo'] });
  await expect(ticket.locator('[data-ticket-vacio]')).toBeVisible();

  await page.getByRole('button', { name: anadir(es['plato.espresso']) }).click();
  await page.getByRole('button', { name: anadir(es['plato.espresso']) }).click();
  await page.getByRole('button', { name: anadir(es['plato.golfeado']) }).click();
  // 2 × 2,00 + 2,50 = 6,50
  await expect(ticket).toContainText(`2 × ${es['plato.espresso']}`);
  await expect(ticket.locator('[data-ticket-total]')).toHaveText('$6,50');
  await expect(ticket.locator('[data-ticket-vacio]')).toBeHidden();

  await page.getByRole('button', { name: quitar(es['plato.espresso']) }).click();
  await expect(ticket.locator('[data-ticket-total]')).toHaveText('$4,50');

  await ticket.getByRole('button', { name: es['ticket.vaciar'] }).click();
  await expect(ticket.locator('[data-ticket-vacio]')).toBeVisible();
  await expect(ticket.locator('[data-ticket-total]')).toHaveText('$0,00');
  await expect(page.getByRole('button', { name: quitar(es['plato.espresso']) })).toBeDisabled();
  // Nada sale de la página: ni al propio sitio ni fuera (solo fotos diferidas e iconos del propio origen)
  expect(peticiones.filter((u) => !u.startsWith(baseURL!) || !/\.(avif|webp|jpe?g|png|svg|woff2?)$/.test(new URL(u).pathname))).toEqual([]);
});

test('se maneja con el teclado y anuncia el total', async ({ page }) => {
  await page.goto('/#para-llevar');
  const boton = page.getByRole('button', { name: anadir(es['plato.guayoyo']) });
  await boton.focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Space');
  await expect(page.locator('[data-ticket-anuncio]')).toHaveText(es['ticket.anuncio'].replace('{n}', '2').replace('{total}', '$5,00'));
});
