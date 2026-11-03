// Punto de entrada del movimiento (constitución II, plan §6). No importa GSAP: con
// reduced-motion el módulo de animaciones ni siquiera se descarga.

export interface ReducedMotionQuery {
  matches: boolean;
  addEventListener(type: 'change', callback: (event: { matches: boolean }) => void): void;
}

export interface AnimationsModule {
  initAnimations(): void;
  destroyAnimations(): void;
}

export function createMotionController(reduced: ReducedMotionQuery, load: () => Promise<AnimationsModule>) {
  let module: AnimationsModule | undefined;
  let running = false;

  async function start() {
    if (reduced.matches || running) return;
    running = true;
    module ??= await load();
    // Pudo detenerse, o cambiar la preferencia, mientras se descargaba
    if (running && !reduced.matches) module.initAnimations();
  }

  function stop() {
    if (!running) return;
    running = false;
    module?.destroyAnimations();
  }

  reduced.addEventListener('change', (event) => (event.matches ? stop() : void start()));
  return { start, stop };
}

/** Se llama una vez desde Base.astro. */
export function startMotion() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  void createMotionController(reduced, () => import('./animations')).start();
}
