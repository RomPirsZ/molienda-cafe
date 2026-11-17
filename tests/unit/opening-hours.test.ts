// Estado de apertura (plan §7): ¿está abierto ahora, en la hora de Mérida?
// Caracas está en UTC−4 todo el año, así que las 10:00 locales son las 14:00 UTC.
import { describe, expect, it } from 'vitest';
import {
  describirApertura,
  describirEstado,
  estadoApertura,
  formatearHora,
  horaLocal,
  type Horario,
} from '../../src/lib/opening-hours';

// 2026-11-02 es lunes; 2026-11-03, martes.
const caracas = (isoLocal: string) => new Date(`${isoLocal}-04:00`);
const sinEspacios = (s: string) => s.replace(/\s+/g, ' ');

const HORARIO: Horario = {
  0: { abre: '08:00', cierra: '14:00' }, // domingo
  1: null, // lunes: cerrado
  2: { abre: '07:00', cierra: '19:00' },
  3: { abre: '07:00', cierra: '19:00' },
  4: { abre: '07:00', cierra: '19:00' },
  5: { abre: '07:00', cierra: '19:00' },
  6: { abre: '08:00', cierra: '20:00' },
};

describe('horaLocal', () => {
  it('usa la hora de Caracas y no la del sistema ni la UTC', () => {
    // Martes 02:00 UTC = lunes 22:00 en Caracas
    expect(horaLocal(new Date('2026-11-03T02:00:00Z'))).toEqual({ dia: 1, minutos: 22 * 60 });
  });
});

describe('estadoApertura', () => {
  it('en horario: abierto, con la hora de cierre de hoy', () => {
    expect(estadoApertura(caracas('2026-11-03T10:00'), HORARIO)).toEqual({ abierto: true, cierra: '19:00' });
  });

  it('antes de abrir: cerrado, abre hoy', () => {
    expect(estadoApertura(caracas('2026-11-03T06:30'), HORARIO)).toEqual({
      abierto: false,
      abre: { dia: 2, hora: '07:00', cuando: 'hoy' },
    });
  });

  it('a la hora exacta de apertura ya está abierto', () => {
    expect(estadoApertura(caracas('2026-11-03T07:00'), HORARIO).abierto).toBe(true);
  });

  it('a la hora exacta de cierre ya está cerrado, y abre mañana', () => {
    expect(estadoApertura(caracas('2026-11-03T19:00'), HORARIO)).toEqual({
      abierto: false,
      abre: { dia: 3, hora: '07:00', cuando: 'manana' },
    });
  });

  it('un día cerrado: abre mañana', () => {
    expect(estadoApertura(caracas('2026-11-02T12:00'), HORARIO)).toEqual({
      abierto: false,
      abre: { dia: 2, hora: '07:00', cuando: 'manana' },
    });
  });

  it('salta los días cerrados: el domingo por la tarde abre el martes', () => {
    expect(estadoApertura(caracas('2026-11-08T15:00'), HORARIO)).toEqual({
      abierto: false,
      abre: { dia: 2, hora: '07:00', cuando: 'otro-dia' },
    });
  });

  it('decide con la hora de Caracas aunque en UTC ya sea otro día', () => {
    // 2026-11-03T02:00Z: martes en UTC, lunes 22:00 en Caracas (cerrado)
    expect(estadoApertura(new Date('2026-11-03T02:00:00Z'), HORARIO)).toEqual({
      abierto: false,
      abre: { dia: 2, hora: '07:00', cuando: 'manana' },
    });
  });

  it('sin ningún día abierto no inventa una apertura', () => {
    const cerrado: Horario = { 0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null };
    expect(estadoApertura(caracas('2026-11-03T10:00'), cerrado)).toEqual({ abierto: false, abre: null });
  });
});

describe('formatearHora', () => {
  it.each([
    ['07:00', '7 a. m.'],
    ['07:30', '7:30 a. m.'],
    ['12:00', '12 p. m.'],
    ['13:00', '1 p. m.'],
    ['19:00', '7 p. m.'],
  ])('%s → %s', (hhmm, esperado) => {
    expect(sinEspacios(formatearHora(hhmm))).toBe(esperado);
  });
});

describe('describirEstado', () => {
  it.each([
    ['2026-11-03T10:00', 'Abierto ahora · cierra a las 7 p. m.'],
    ['2026-11-03T06:30', 'Cerrado · abre hoy a las 7 a. m.'],
    ['2026-11-02T12:00', 'Cerrado · abre mañana a las 7 a. m.'],
    ['2026-11-08T15:00', 'Cerrado · abre el martes a las 7 a. m.'],
  ])('%s → «%s»', (local, esperado) => {
    expect(sinEspacios(describirEstado(estadoApertura(caracas(local), HORARIO)))).toBe(esperado);
  });

  it('usa «a la» con la 1', () => {
    const h: Horario = { ...HORARIO, 2: { abre: '07:00', cierra: '13:00' } };
    expect(sinEspacios(describirEstado(estadoApertura(caracas('2026-11-03T10:00'), h)))).toBe(
      'Abierto ahora · cierra a la 1 p. m.',
    );
  });

  it('sin apertura prevista, solo dice que está cerrado', () => {
    expect(describirEstado({ abierto: false, abre: null })).toBe('Cerrado');
  });
});

describe('describirApertura (placa del portón)', () => {
  it('abierto: sin segunda línea', () => {
    expect(describirApertura({ abierto: true, cierra: '19:00' })).toBeNull();
  });
  it('cerrado: dice cuándo abre', () => {
    expect(describirApertura({ abierto: false, abre: { dia: 2, hora: '07:00', cuando: 'hoy' } })).toMatch(/^Abre a las 7\sa\.\sm\.$/);
    expect(describirApertura({ abierto: false, abre: { dia: 2, hora: '07:00', cuando: 'manana' } })).toMatch(/^Mañana, 7\sa\.\sm\.$/);
    expect(describirApertura({ abierto: false, abre: { dia: 0, hora: '08:00', cuando: 'otro-dia' } })).toMatch(/^El domingo, 8\sa\.\sm\.$/);
  });
});
