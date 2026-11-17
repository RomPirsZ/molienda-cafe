// Movimiento de Molienda (spec §6, plan §6). Solo se carga sin reduced-motion (motion.ts).
// Hoy se anima transform y opacity; la constitución II (1.3.0) admite también clip-path,
// mask, filtros, color y sombras, nunca propiedades que recalculan el diseño.
// Los tiempos del revelado de fotos salen de noovolife (medido el 2026-11-03).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** cubic-bezier(.22, 1, .36, 1) de noovolife es una quíntica de salida: power4.out en GSAP. */
const SALIDA = 'power4.out';
// 92 %: lo que asoma al pie de la pantalla ya se revela (con 85 % un título podía
// quedar oculto justo en el borde del primer viewport, visto en la revisión a 768 px)
const AL_ENTRAR = 'top 92%';

let lenis: Lenis | undefined;
let contexto: gsap.Context | undefined;
const limpiezas: (() => void)[] = [];

// Lenis avanza con el reloj de GSAP: scroll suave y ScrollTrigger van sincronizados
const tick = (tiempo: number) => lenis?.raf(tiempo * 1000);

/** El respaldo CSS ya lo mostró (el módulo llegó tarde): no se vuelve a ocultar. */
const yaVisible = (el: Element) => getComputedStyle(el).opacity !== '0';

/**
 * La fachada se enciende una vez al cargar (contrato de dirección): las ventanas y la
 * puerta pasan de apagadas a su luz. Solo si el café está abierto; si no, se quedan
 * apagadas, que es la verdad.
 */
function luces(raiz: ParentNode) {
  const fachada = raiz.querySelector<HTMLElement>('[data-fachada]');
  if (!fachada || fachada.dataset['abierto'] === 'false') return;
  const luces = fachada.querySelectorAll('[data-luz]:not(.c-luz-vecina)');
  gsap.from(luces, { opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12, delay: 0.2 });
}

/** Títulos de sección: suben por líneas, dentro de una máscara, al entrar en pantalla. */
function titulos(raiz: ParentNode) {
  raiz.querySelectorAll<HTMLElement>('h2[data-revelar="titulo"]').forEach((h2) => {
    if (yaVisible(h2)) return;
    SplitText.create(h2, {
      type: 'lines',
      mask: 'lines',
      aria: 'auto',
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 100,
          duration: 0.9,
          ease: SALIDA,
          stagger: 0.08,
          scrollTrigger: { trigger: h2, start: AL_ENTRAR, once: true },
        }),
    });
  });
}

/**
 * Platos (tarjetas): entran escalonados. Durante la entrada se apaga la transición CSS
 * del hover (si no, suavizaría el tween) y al acabar se limpian las propiedades para que
 * el hover vuelva a mandar.
 */
function platos(raiz: ParentNode) {
  raiz.querySelectorAll<HTMLElement>('[data-revelar="platos"]').forEach((lista) => {
    if (yaVisible(lista)) return;
    const items = lista.querySelectorAll(':scope > li');
    gsap.from(items, {
      y: 30,
      opacity: 0,
      duration: 0.9,
      ease: SALIDA,
      // 40 ms: una lista de 5 platos escalona en 200 ms (por debajo de ~300 ms, M08)
      stagger: 0.04,
      onStart: () => gsap.set(items, { transition: 'none' }),
      clearProps: 'transform,opacity,transition',
      scrollTrigger: { trigger: lista, start: AL_ENTRAR, once: true },
    });
  });
}

/**
 * Revelado de fotos (noovolife): el marco sube 50 px mientras la foto, dentro de su
 * ventana con overflow oculto, pasa de escala 1,12 a 1. Después, un zoom lento ligado
 * al scroll (en el <picture>, para no pisar el tween de la <img>).
 */
function fotos(raiz: ParentNode) {
  raiz.querySelectorAll<HTMLElement>('[data-foto]').forEach((marco) => {
    const img = marco.querySelector('img');
    const picture = marco.querySelector('picture');
    if (!img) return;
    if (!yaVisible(marco)) {
      // Una línea de tiempo con un solo disparador (GSAP modifica el objeto de
      // scrollTrigger al crearlo: compartirlo entre tweens dejaba fotos sin revelar)
      gsap
        .timeline({ scrollTrigger: { trigger: marco, start: AL_ENTRAR, once: true } })
        .from(marco, { y: 50, duration: 1.2, ease: SALIDA }, 0)
        .from(marco, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0)
        .from(img, { scale: 1.12, duration: 1.2, ease: SALIDA }, 0);
    }
    if (picture) {
      gsap.fromTo(
        picture,
        { scale: 1 },
        { scale: 1.08, ease: 'none', scrollTrigger: { trigger: marco, start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    }
  });
}

/** La cabecera se oculta al bajar y vuelve al subir; nunca mientras tiene el foco del teclado. */
function cabeceraOculta(raiz: ParentNode) {
  const cabecera = raiz.querySelector<HTMLElement>('[data-cabecera]');
  if (!cabecera) return;
  let oculta = false;
  const mostrar = (si: boolean) => {
    if (si === !oculta) return;
    oculta = !si;
    // Vuelve en 250 ms; al apartarse, más rápido (150 ms): lo que se quita no estorba (M08)
    gsap.to(cabecera, { yPercent: si ? 0 : -100, duration: si ? 0.25 : 0.15, ease: SALIDA, overwrite: true });
  };
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => {
      if (cabecera.contains(document.activeElement)) return mostrar(true);
      if (self.scroll() < cabecera.offsetHeight * 2) return mostrar(true);
      mostrar(self.direction < 0);
    },
  });
  const alFoco = () => mostrar(true);
  cabecera.addEventListener('focusin', alFoco);
  limpiezas.push(() => cabecera.removeEventListener('focusin', alFoco));
}

let iniciado = false;

export function initAnimations() {
  if (iniciado) return;
  iniciado = true;
  const raiz = document.documentElement;
  raiz.classList.add('motion');

  // Scroll suave solo con ratón. En táctil Lenis no suaviza nada y, como no sigue el
  // scroll nativo del dedo, calculaba mal el destino de los enlaces a secciones (en el
  // móvil «Ver la carta» se quedaba a medio camino): allí manda el scroll nativo.
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    // Los enlaces a secciones también se desplazan suave. Lenis ya respeta el
    // scroll-padding-top de global.css (sitio para la cabecera): sin offset propio
    lenis = new Lenis({ anchors: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  }

  contexto = gsap.context(() => {
    luces(document);
    titulos(document);
    platos(document);
    fotos(document);
    cabeceraOculta(document);
  });
  // Las entradas ya tienen su estado inicial: el CSS deja de ocultarlas
  raiz.classList.add('motion-ready');
  // Las líneas y las posiciones dependen de las fuentes
  void document.fonts.ready.then(() => ScrollTrigger.refresh());
}

export function destroyAnimations() {
  contexto?.revert();
  contexto = undefined;
  limpiezas.splice(0).forEach((limpiar) => limpiar());
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.ticker.remove(tick);
  gsap.ticker.lagSmoothing(500, 33);
  lenis?.destroy();
  lenis = undefined;
  iniciado = false;
  document.documentElement.classList.remove('motion', 'motion-ready');
}
