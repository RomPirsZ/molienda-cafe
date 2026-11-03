import es from './es.json';

export type Clave = keyof typeof es;

/** Texto de interfaz (constitución IX). Solo español en v1 (spec §8). */
export function t(clave: Clave): string {
  return es[clave];
}
