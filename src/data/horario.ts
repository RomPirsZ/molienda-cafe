// Horario ficticio de Molienda (spec §4). El lunes cierra: se muestra apagado, no se omite.
import type { Horario } from '../lib/opening-hours';

export const HORARIO: Horario = {
  0: { abre: '08:00', cierra: '14:00' }, // domingo
  1: null, // lunes
  2: { abre: '07:00', cierra: '19:00' },
  3: { abre: '07:00', cierra: '19:00' },
  4: { abre: '07:00', cierra: '19:00' },
  5: { abre: '07:00', cierra: '19:00' },
  6: { abre: '08:00', cierra: '20:00' }, // sábado
};
