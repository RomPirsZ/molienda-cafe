// Contraste de los tokens de color (constitución III, plan §11). Cada par que el sitio
// usa como texto sobre fondo tiene que llegar a AA (4,5:1).
import { describe, expect, it } from 'vitest';
// ?raw (Vite): el CSS como texto, sin depender de los tipos de Node
import css from '../../src/styles/global.css?raw';
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
  it('define todos los roles del plan §11', () => {
    expect(Object.keys(t).sort()).toEqual(
      [
        'noche', 'espresso', 'pergamino', 'pergamino-suave', 'frailejon', 'kraft', 'tostado', 'oliva',
        'pizarra', 'luz', 'linea', 'monte', 'muro', 'teja', 'apagado',
      ].sort(),
    );
  });

  it.each([
    // Texto sobre la noche y las superficies oscuras
    ['pergamino', 'noche'],
    ['pergamino', 'espresso'],
    ['pergamino-suave', 'noche'],
    ['pergamino-suave', 'espresso'],
    ['frailejon', 'noche'],
    ['frailejon', 'espresso'],
    // La pizarra de la acera
    ['pergamino', 'pizarra'],
    ['pergamino-suave', 'pizarra'],
    ['frailejon', 'pizarra'],
    // Bloques claros del panel y del ticket: texto noche
    ['noche', 'pergamino'],
    ['noche', 'frailejon'],
    ['noche', 'kraft'],
    // Bloques oscuros del panel: texto pergamino
    ['pergamino', 'tostado'],
    ['pergamino', 'oliva'],
    // La placa de la puerta, de noche sobre la luz
    ['noche', 'luz'],
  ])('%s sobre %s cumple AA (4,5:1)', (texto, fondo) => {
    expect(contrast(t[texto]!, t[fondo]!)).toBeGreaterThanOrEqual(4.5);
  });

  it('ningún componente usa un hex propio: los colores salen de los tokens', () => {
    // Solo global.css define colores (CLAUDE.md: nunca un hex de tema en un componente)
    const fuera = css.replace(/:root\s*\{[^}]*\}/, '').match(/#[0-9a-f]{6}\b/gi) ?? [];
    expect(fuera).toEqual([]);
  });
});
