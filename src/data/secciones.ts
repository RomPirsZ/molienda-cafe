// Las secciones de la página, en el orden del panel lateral y de la navegación del pie
// (spec §10.3): cada bloque del panel lleva a su sección.
import type { Clave } from '../i18n';

export interface Seccion {
  href: `#${string}`;
  nombre: Clave;
  detalle: Clave;
  /** Color del bloque en el panel (de claro a oscuro) y del texto sobre él */
  fondo: 'pergamino' | 'frailejon' | 'kraft' | 'tostado' | 'espresso';
}

export const SECCIONES: Seccion[] = [
  { href: '#carta', nombre: 'nav.carta', detalle: 'bloque.carta', fondo: 'pergamino' },
  { href: '#origen', nombre: 'nav.origen', detalle: 'bloque.origen', fondo: 'frailejon' },
  { href: '#para-llevar', nombre: 'nav.paraLlevar', detalle: 'bloque.paraLlevar', fondo: 'kraft' },
  { href: '#horario', nombre: 'nav.horario', detalle: 'bloque.horario', fondo: 'tostado' },
  { href: '#visitanos', nombre: 'nav.visitanos', detalle: 'bloque.visitanos', fondo: 'espresso' },
];
