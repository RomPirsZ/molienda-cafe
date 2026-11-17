// Cabeceras de seguridad (plan §11): la CSP de public/_headers solo admite scripts del
// propio sitio y el script en línea de Base.astro por su hash. Si ese script cambia y el
// hash no, en producción no se ejecutaría: este test lo detecta antes de desplegar.
import { test, expect, type APIRequestContext } from '@playwright/test';

// Sin tipos de Node (plan §2): el archivo se pide al servidor de pruebas, que sirve public/
// tal cual, y el hash se calcula con Web Crypto
async function leerCsp(request: APIRequestContext): Promise<string> {
  const texto = await (await request.get('/_headers')).text();
  return texto.match(/Content-Security-Policy: (.*)/)?.[1] ?? '';
}
async function sha256(texto: string): Promise<string> {
  const resumen = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(texto));
  return btoa(String.fromCharCode(...new Uint8Array(resumen)));
}

test('cada script en línea tiene su hash en la CSP, y no hay estilos en línea', async ({ request }) => {
  // El HTML tal como se sirve (en el DOM, GSAP pone estilos por CSSOM, que la CSP permite)
  const csp = await leerCsp(request);
  expect(csp).toContain("script-src 'self'");
  const html = await (await request.get('/')).text();
  const enLinea = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1] ?? '');
  expect(enLinea.length).toBeGreaterThan(0);
  for (const codigo of enLinea) {
    const hash = await sha256(codigo);
    expect(csp, 'hash del script en línea').toContain(`'sha256-${hash}'`);
  }
  // style-src 'self' sin hashes: ni <style> ni atributos style="" en el HTML servido
  expect(html).not.toMatch(/<style[\s>]/);
  expect(html).not.toMatch(/\sstyle="/);
});

test('con la CSP de producción, la página funciona sin violaciones (panel y ticket incluidos)', async ({ page, request }) => {
  const csp = await leerCsp(request);
  // astro preview no aplica public/_headers: se añade la CSP a la respuesta del HTML
  await page.route('**/*', async (ruta) => {
    const respuesta = await ruta.fetch();
    const esHtml = (respuesta.headers()['content-type'] ?? '').includes('text/html');
    await ruta.fulfill({ response: respuesta, headers: { ...respuesta.headers(), ...(esHtml ? { 'content-security-policy': csp } : {}) } });
  });
  await page.addInitScript(() => {
    (window as unknown as { violaciones: string[] }).violaciones = [];
    document.addEventListener('securitypolicyviolation', (e) =>
      (window as unknown as { violaciones: string[] }).violaciones.push(`${e.violatedDirective} ${e.blockedURI}`),
    );
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/\bjs\b/);
  await page.locator('[data-abrir-panel]').click();
  await expect(page.locator('[data-abrir-panel]')).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await page.goto('/#para-llevar');
  await page.getByRole('button', { name: /Añadir Espresso/ }).click();
  await expect(page.locator('[data-ticket-total]')).toHaveText('$2,00');
  expect(await page.evaluate(() => (window as unknown as { violaciones: string[] }).violaciones)).toEqual([]);
});
