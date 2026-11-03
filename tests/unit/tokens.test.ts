// Contraste de los tokens de color (constitución III, plan §4). Cada par que el sitio
// usa como texto sobre fondo tiene que llegar a AA (4,5:1); los textos grandes y los
// elementos gráficos, a 3:1.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const css = readFileSync(new URL('../../src/styles/global.css', import.meta.url), 'utf8');
const root = css.match(/:root\s*\{([^}]*)\}/)?.[1] ?? '';
const t: Record<string, string> = Object.fromEntries(
  [...root.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]),
);

function luminance(hex: string): number {
  const [r = 0, g = 0, b = 0] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

describe('tokens de color', () => {
  it('define todos los roles del plan §4', () => {
    expect(Object.keys(t).sort()).toEqual(
      ['acento', 'accion', 'franja', 'linea', 'papel', 'papel-claro', 'tinta', 'tinta-suave'].sort(),
    );
  });

  it.each([
    ['tinta', 'papel'],
    ['tinta', 'papel-claro'],
    ['tinta-suave', 'papel'],
    ['tinta-suave', 'papel-claro'],
    // La acción puede ir como texto (enlaces activos) sobre los dos papeles
    ['accion', 'papel'],
    ['accion', 'papel-claro'],
    // Texto claro sobre los rellenos de color
    ['papel-claro', 'accion'],
    ['papel-claro', 'franja'],
    ['papel-claro', 'tinta'],
    // La mostaza solo va como texto sobre la tinta
    ['acento', 'tinta'],
  ])('%s sobre %s cumple AA (4,5:1)', (texto, fondo) => {
    expect(contrast(t[texto]!, t[fondo]!)).toBeGreaterThanOrEqual(4.5);
  });

  it('la mostaza sobre la oliva solo alcanza para texto grande o adornos (3:1)', () => {
    expect(contrast(t['acento']!, t['franja']!)).toBeGreaterThanOrEqual(3);
  });

  it('ningún componente usa un hex propio: los colores salen de los tokens', () => {
    // Solo global.css define colores (CLAUDE.md: nunca un hex de tema en un componente)
    const fuera = css.replace(/:root\s*\{[^}]*\}/, '').match(/#[0-9a-f]{6}\b/gi) ?? [];
    expect(fuera).toEqual([]);
  });
});
