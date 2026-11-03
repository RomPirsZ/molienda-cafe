import es from './es.json';

export type Clave = keyof typeof es;

/**
 * Texto de interfaz (constitución IX). Solo español en v1 (spec §8).
 * Sustituye `{nombre}` por el valor de `vars.nombre`.
 */
export function t(clave: Clave, vars: Record<string, string> = {}): string {
  return es[clave].replace(/\{(\w+)\}/g, (marca, nombre: string) => vars[nombre] ?? marca);
}
