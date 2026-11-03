// Fotos de ambientación (spec §7, plan §9): cada una con texto alternativo, autor,
// licencia libre y enlace a su origen, para poder citarla en el pie.
import { describe, expect, it } from 'vitest';
import es from '../../src/i18n/es.json';
import { FOTOS } from '../../src/data/fotos';

describe('fotos', () => {
  it.each(Object.entries(FOTOS))('%s tiene alt, autor, licencia y fuente', (_, foto) => {
    expect(es[foto.alt].length).toBeGreaterThan(10);
    expect(foto.autor.trim()).not.toBe('');
    expect(foto.licenciaUrl).toMatch(/^https:\/\/creativecommons\.org\//);
    expect(foto.fuente).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
  });

  it('ninguna foto pasa de 2000 px de ancho (las versiones para pantalla las genera Astro)', () => {
    for (const foto of Object.values(FOTOS)) expect(foto.src.width).toBeLessThanOrEqual(2000);
  });
});
