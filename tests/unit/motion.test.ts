// Controlador de movimiento (constitución II, plan §6): con reduced-motion no se
// descarga ni se inicia nada, y responde si el visitante cambia la preferencia.
import { describe, expect, it, vi } from 'vitest';
import { createMotionController, type ReducedMotionQuery } from '../../src/lib/motion';

function fakeQuery(reduce: boolean) {
  let listener: ((event: { matches: boolean }) => void) | undefined;
  const query: ReducedMotionQuery = {
    matches: reduce,
    addEventListener: (_type, callback) => (listener = callback),
  };
  return {
    query,
    change(next: boolean) {
      query.matches = next;
      listener?.({ matches: next });
    },
  };
}

function fakeModule() {
  const module = { initAnimations: vi.fn(), destroyAnimations: vi.fn() };
  return { module, load: vi.fn(async () => module) };
}

describe('controlador de movimiento', () => {
  it('con reduced-motion no descarga ni inicia nada', async () => {
    const { query } = fakeQuery(true);
    const { load } = fakeModule();
    await createMotionController(query, load).start();
    expect(load).not.toHaveBeenCalled();
  });

  it('sin reduced-motion carga el módulo una vez e inicia', async () => {
    const { query } = fakeQuery(false);
    const { module, load } = fakeModule();
    const controller = createMotionController(query, load);
    await controller.start();
    await controller.start();
    expect(load).toHaveBeenCalledTimes(1);
    expect(module.initAnimations).toHaveBeenCalledTimes(1);
  });

  it('si se activa reduced-motion, se detiene; si se desactiva, vuelve sin descargar otra vez', async () => {
    const media = fakeQuery(false);
    const { module, load } = fakeModule();
    await createMotionController(media.query, load).start();
    media.change(true);
    expect(module.destroyAnimations).toHaveBeenCalledTimes(1);
    media.change(false);
    await vi.waitFor(() => expect(module.initAnimations).toHaveBeenCalledTimes(2));
    expect(load).toHaveBeenCalledTimes(1);
  });

  it('si se activa reduced-motion mientras se descarga, no llega a iniciar', async () => {
    const media = fakeQuery(false);
    const { module } = fakeModule();
    let resolver!: (m: typeof module) => void;
    const load = vi.fn(() => new Promise<typeof module>((r) => (resolver = r)));
    const arranque = createMotionController(media.query, load).start();
    media.change(true);
    resolver(module);
    await arranque;
    expect(module.initAnimations).not.toHaveBeenCalled();
  });
});
