// Ticket «Para llevar» (spec §10.2, punto 5; plan §11): funciones puras, sin estado ni
// red. Es una demostración: el ticket vive solo en la página y no se envía ni se guarda.

export interface Producto {
  id: string;
  nombre: string;
  /** En dólares, como en la carta */
  precio: number;
}
export type Catalogo = Producto[];
/** id del producto → unidades (siempre ≥ 1; lo que no está, no se pidió) */
export type Ticket = Readonly<Record<string, number>>;
export interface Linea {
  id: string;
  nombre: string;
  cantidad: number;
  subtotal: number;
}

/** Tope por producto: un pedido para llevar, no un encargo. */
export const MAXIMO = 20;

const centimos = (dolares: number) => Math.round(dolares * 100);

export function cantidad(ticket: Ticket, id: string): number {
  return ticket[id] ?? 0;
}

export function anadir(ticket: Ticket, id: string): Ticket {
  return { ...ticket, [id]: Math.min(MAXIMO, cantidad(ticket, id) + 1) };
}

export function quitar(ticket: Ticket, id: string): Ticket {
  const n = cantidad(ticket, id) - 1;
  const { [id]: _, ...resto } = ticket;
  return n > 0 ? { ...resto, [id]: n } : resto;
}

export function unidades(ticket: Ticket): number {
  return Object.values(ticket).reduce((suma, n) => suma + n, 0);
}

/** Las líneas en el orden de la carta; lo que no está en el catálogo se ignora. */
export function lineas(ticket: Ticket, catalogo: Catalogo): Linea[] {
  return catalogo
    .filter((p) => cantidad(ticket, p.id) > 0)
    .map((p) => {
      const n = cantidad(ticket, p.id);
      return { id: p.id, nombre: p.nombre, cantidad: n, subtotal: (centimos(p.precio) * n) / 100 };
    });
}

/** Total en dólares, sumado en céntimos. */
export function total(ticket: Ticket, catalogo: Catalogo): number {
  return lineas(ticket, catalogo).reduce((suma, l) => suma + centimos(l.subtotal), 0) / 100;
}
