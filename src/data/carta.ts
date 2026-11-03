// Carta de Molienda (spec §4). Todo es ficticio: el café no existe, los precios son de
// ejemplo y las fincas son inventadas (se marcan con *). Las regiones sí son reales.
import type { Clave } from '../i18n';

/** Se muestra en la carta: «Precios de ejemplo…» (spec §7). */
export const PRECIOS_FICTICIOS = true;

export const REGIONES = ['Mérida', 'Táchira', 'Trujillo'] as const;

export interface Plato {
  nombre: Clave;
  descripcion: Clave;
  /** En dólares (USD), como se cobra en Venezuela */
  precio: number;
  /** Solo los cafés: finca ficticia, región real y altitud en metros */
  origen?: { finca: Clave; region: (typeof REGIONES)[number]; altitud: number };
}

export interface Categoria {
  id: 'cafe' | 'panaderia' | 'brunch';
  titulo: Clave;
  platos: Plato[];
}

export const CARTA: Categoria[] = [
  {
    id: 'cafe',
    titulo: 'carta.cafe',
    platos: [
      { nombre: 'plato.espresso', descripcion: 'plato.espresso.desc', precio: 2, origen: { finca: 'finca.neblina', region: 'Mérida', altitud: 1600 } },
      { nombre: 'plato.guayoyo', descripcion: 'plato.guayoyo.desc', precio: 2.5, origen: { finca: 'finca.quebrada', region: 'Táchira', altitud: 1450 } },
      { nombre: 'plato.marron', descripcion: 'plato.marron.desc', precio: 3, origen: { finca: 'finca.neblina', region: 'Mérida', altitud: 1600 } },
      { nombre: 'plato.filtrado', descripcion: 'plato.filtrado.desc', precio: 4, origen: { finca: 'finca.alto', region: 'Trujillo', altitud: 1750 } },
      { nombre: 'plato.conLeche', descripcion: 'plato.conLeche.desc', precio: 3.5, origen: { finca: 'finca.quebrada', region: 'Táchira', altitud: 1450 } },
    ],
  },
  {
    id: 'panaderia',
    titulo: 'carta.panaderia',
    platos: [
      { nombre: 'plato.panAndino', descripcion: 'plato.panAndino.desc', precio: 1.5 },
      { nombre: 'plato.mantecada', descripcion: 'plato.mantecada.desc', precio: 1.75 },
      { nombre: 'plato.golfeado', descripcion: 'plato.golfeado.desc', precio: 2.5 },
      { nombre: 'plato.cachito', descripcion: 'plato.cachito.desc', precio: 2.25 },
    ],
  },
  {
    id: 'brunch',
    titulo: 'carta.brunch',
    platos: [
      { nombre: 'plato.pisca', descripcion: 'plato.pisca.desc', precio: 5.5 },
      { nombre: 'plato.arepaTrigo', descripcion: 'plato.arepaTrigo.desc', precio: 4.5 },
      { nombre: 'plato.pastelitos', descripcion: 'plato.pastelitos.desc', precio: 4 },
      { nombre: 'plato.perico', descripcion: 'plato.perico.desc', precio: 5 },
    ],
  },
];

const formato = new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' });

/** «$2,00» (formato venezolano) */
export function precio(valor: number): string {
  return formato.format(valor);
}
