let contador = 0;

/** Id único dentro de la página, para SVG que se repiten (p. ej. el anillo del sello). */
export function nuevoId(prefijo: string): string {
  contador += 1;
  return `${prefijo}-${contador}`;
}
