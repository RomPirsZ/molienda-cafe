import { describe, expect, it } from 'vitest';
import es from '../../src/i18n/es.json';
import { t } from '../../src/i18n';

describe('i18n', () => {
  it('devuelve el texto de una clave', () => {
    expect(t('marca.nombre')).toBe('Molienda');
  });

  it('ninguna clave está vacía', () => {
    for (const [clave, texto] of Object.entries(es)) expect(texto.trim(), clave).not.toBe('');
  });
});
