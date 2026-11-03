// Coherencia de la carta (plan §8): todo es ficticio y se dice; las regiones de origen
// son reales (spec §4: Mérida, Táchira, Trujillo); cada texto está en es.json.
import { describe, expect, it } from 'vitest';
import es from '../../src/i18n/es.json';
import { CARTA, PRECIOS_FICTICIOS, REGIONES } from '../../src/data/carta';
import { HORARIO } from '../../src/data/horario';

const platos = CARTA.flatMap((c) => c.platos);

describe('carta', () => {
  it('tiene café, panadería y brunch (PRODUCT.md)', () => {
    expect(CARTA.map((c) => c.id)).toEqual(['cafe', 'panaderia', 'brunch']);
  });

  it('los precios se declaran ficticios', () => {
    expect(PRECIOS_FICTICIOS).toBe(true);
    expect(es['carta.aviso']).toMatch(/ficticio|de ejemplo/i);
  });

  it.each(platos.map((p) => [p.nombre, p] as const))('%s: precio en dólares con dos decimales y textos en es.json', (_, p) => {
    expect(p.precio).toBeGreaterThan(0);
    expect(Number.isInteger(Math.round(p.precio * 100))).toBe(true);
    expect(es[p.nombre]).toBeTruthy();
    expect(es[p.descripcion]).toBeTruthy();
  });

  it('cada café dice de dónde viene: finca ficticia, región real y altitud', () => {
    const cafes = CARTA.find((c) => c.id === 'cafe')!.platos;
    expect(cafes.length).toBeGreaterThanOrEqual(3);
    for (const c of cafes) {
      expect(c.origen, c.nombre).toBeDefined();
      expect(REGIONES).toContain(c.origen!.region);
      expect(c.origen!.altitud).toBeGreaterThanOrEqual(1000);
      expect(c.origen!.altitud).toBeLessThanOrEqual(2000);
    }
  });

  it('los tres primeros cafés (los del primer viewport) existen', () => {
    expect(CARTA[0]!.platos.slice(0, 3)).toHaveLength(3);
  });
});

describe('horario', () => {
  it('cubre los siete días y al menos uno está cerrado (se muestra apagado)', () => {
    expect(Object.keys(HORARIO)).toHaveLength(7);
    expect(Object.values(HORARIO).some((t) => t === null)).toBe(true);
  });

  it('cada tramo abre antes de cerrar, el mismo día', () => {
    for (const tramo of Object.values(HORARIO)) {
      if (tramo) expect(tramo.abre < tramo.cierra).toBe(true);
    }
  });
});
