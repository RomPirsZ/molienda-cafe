// Estado de apertura del café (spec §6, plan §7). Funciones puras: la fecha entra
// como argumento, así se prueban con fechas fijas. La hora es siempre la de Mérida
// (America/Caracas, UTC−4 sin horario de verano), sea cual sea la zona del visitante.
import { t } from '../i18n';

export const ZONA = 'America/Caracas';

/** Día de la semana como en `Date.getDay()`: 0 = domingo. */
export type Dia = 0 | 1 | 2 | 3 | 4 | 5 | 6;
/** Horas en formato 24 h `HH:MM`; `cierra` es posterior a `abre`, el mismo día. */
export interface Tramo {
  abre: string;
  cierra: string;
}
/** `null` = ese día está cerrado (se muestra igual, apagado: spec §6). */
export type Horario = Record<Dia, Tramo | null>;

export type Estado =
  | { abierto: true; cierra: string }
  | { abierto: false; abre: { dia: Dia; hora: string; cuando: 'hoy' | 'manana' | 'otro-dia' } | null };

const DIAS: Record<string, Dia> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const formatos = new Map<string, Intl.DateTimeFormat>();

function formatoZona(zona: string): Intl.DateTimeFormat {
  let f = formatos.get(zona);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone: zona,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    });
    formatos.set(zona, f);
  }
  return f;
}

const aMinutos = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));

/** Día y minutos desde medianoche en la zona dada. */
export function horaLocal(fecha: Date, zona = ZONA): { dia: Dia; minutos: number } {
  const p = Object.fromEntries(formatoZona(zona).formatToParts(fecha).map((x) => [x.type, x.value]));
  return { dia: DIAS[p['weekday'] ?? 'Sun'] ?? 0, minutos: Number(p['hour']) * 60 + Number(p['minute']) };
}

export function estadoApertura(fecha: Date, horario: Horario, zona = ZONA): Estado {
  const { dia, minutos } = horaLocal(fecha, zona);
  const hoy = horario[dia];
  if (hoy && minutos >= aMinutos(hoy.abre) && minutos < aMinutos(hoy.cierra)) {
    return { abierto: true, cierra: hoy.cierra };
  }
  if (hoy && minutos < aMinutos(hoy.abre)) {
    return { abierto: false, abre: { dia, hora: hoy.abre, cuando: 'hoy' } };
  }
  for (let i = 1; i <= 7; i++) {
    const siguiente = ((dia + i) % 7) as Dia;
    const tramo = horario[siguiente];
    if (tramo) return { abierto: false, abre: { dia: siguiente, hora: tramo.abre, cuando: i === 1 ? 'manana' : 'otro-dia' } };
  }
  return { abierto: false, abre: null };
}

const formatoHora = new Intl.DateTimeFormat('es-VE', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZone: 'UTC',
});

/** `'19:00'` → «7 p. m.»; `'07:30'` → «7:30 a. m.» (en punto, sin «:00»). */
export function formatearHora(hhmm: string): string {
  const fecha = new Date(Date.UTC(2026, 0, 1, Number(hhmm.slice(0, 2)), Number(hhmm.slice(3, 5))));
  const partes = formatoHora.formatToParts(fecha);
  const enPunto = partes.find((p) => p.type === 'minute')?.value === '00';
  return partes
    .filter((p, i) => !(enPunto && (p.type === 'minute' || (p.type === 'literal' && partes[i + 1]?.type === 'minute'))))
    .map((p) => p.value)
    .join('');
}

/** «la 1 p. m.», «la 1:30 p. m.», «las 7 p. m.» («1» seguido de algo que no es otra cifra). */
function horaConArticulo(hhmm: string): string {
  const texto = formatearHora(hhmm);
  const articulo = /^1(\D|$)/.test(texto) ? t('horario.articuloUna') : t('horario.articuloVarias');
  return `${articulo} ${texto}`;
}

const formatoDia = new Intl.DateTimeFormat('es-VE', { weekday: 'long', timeZone: 'UTC' });

/** Nombre del día en español: 0 → «domingo». (2026-11-01 fue domingo.) */
export function nombreDia(dia: Dia): string {
  return formatoDia.format(new Date(Date.UTC(2026, 10, 1 + dia)));
}

/** Texto del estado para la interfaz, p. ej. «Abierto ahora · cierra a las 7 p. m.» */
export function describirEstado(estado: Estado): string {
  if (estado.abierto) return t('horario.abierto', { hora: horaConArticulo(estado.cierra) });
  if (!estado.abre) return t('horario.cerrado');
  const hora = horaConArticulo(estado.abre.hora);
  if (estado.abre.cuando === 'hoy') return t('horario.abreHoy', { hora });
  if (estado.abre.cuando === 'manana') return t('horario.abreManana', { hora });
  return t('horario.abreOtroDia', { dia: nombreDia(estado.abre.dia), hora });
}
