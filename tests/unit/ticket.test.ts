// Ticket «Para llevar» (spec §10.2, punto 5; plan §11). Escrito antes que ticket.ts.
import { describe, expect, it } from 'vitest';
import { anadir, cantidad, lineas, quitar, total, unidades, MAXIMO, type Catalogo } from '../../src/lib/ticket';

const catalogo: Catalogo = [
  { id: 'espresso', nombre: 'Espresso', precio: 2 },
  { id: 'golfeado', nombre: 'Golfeado', precio: 2.5 },
  { id: 'mantecada', nombre: 'Mantecada', precio: 1.75 },
];

describe('ticket', () => {
  it('empieza vacío', () => {
    expect(lineas({}, catalogo)).toEqual([]);
    expect(total({}, catalogo)).toBe(0);
    expect(unidades({})).toBe(0);
  });

  it('añade y quita sin mutar el ticket anterior', () => {
    const vacio = {};
    const uno = anadir(vacio, 'espresso');
    expect(vacio).toEqual({});
    expect(cantidad(uno, 'espresso')).toBe(1);
    const dos = anadir(uno, 'espresso');
    expect(cantidad(dos, 'espresso')).toBe(2);
    expect(cantidad(quitar(dos, 'espresso'), 'espresso')).toBe(1);
  });

  it('quitar el último lo saca del ticket, y nunca baja de cero', () => {
    const t = quitar(anadir({}, 'golfeado'), 'golfeado');
    expect(t).toEqual({});
    expect(quitar({}, 'golfeado')).toEqual({});
  });

  it(`no pasa de ${MAXIMO} unidades por producto`, () => {
    let t = {};
    for (let i = 0; i < MAXIMO + 5; i++) t = anadir(t, 'espresso');
    expect(cantidad(t, 'espresso')).toBe(MAXIMO);
  });

  it('ignora productos que no están en el catálogo', () => {
    expect(lineas({ inventado: 3 }, catalogo)).toEqual([]);
    expect(total({ inventado: 3 }, catalogo)).toBe(0);
  });

  it('suma en céntimos: sin errores de coma flotante', () => {
    // 3 × 1,75 + 1 × 2,50 + 2 × 2,00 = 11,75
    let t = {};
    for (let i = 0; i < 3; i++) t = anadir(t, 'mantecada');
    t = anadir(t, 'golfeado');
    t = anadir(anadir(t, 'espresso'), 'espresso');
    expect(total(t, catalogo)).toBe(11.75);
    expect(unidades(t)).toBe(6);
  });

  it('las líneas siguen el orden de la carta, con su subtotal', () => {
    const t = anadir(anadir(anadir({}, 'mantecada'), 'espresso'), 'mantecada');
    expect(lineas(t, catalogo)).toEqual([
      { id: 'espresso', nombre: 'Espresso', cantidad: 1, subtotal: 2 },
      { id: 'mantecada', nombre: 'Mantecada', cantidad: 2, subtotal: 3.5 },
    ]);
  });
});
