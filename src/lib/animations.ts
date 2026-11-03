// Movimiento de Molienda (spec §6, plan §6). Solo se carga sin reduced-motion (motion.ts).
// Solo se anima transform y opacity (constitución II): nada de filter ni clip-path.
// Los tiempos del revelado de fotos salen de noovolife (medido el 2026-11-03).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

/** cubic-bezier(.22, 1, .36, 1) de noovolife es una quíntica de salida: power4.out en GSAP. */
const SALIDA = 'power4.out';
const AL_ENTRAR = 'top 85%';

let lenis: Lenis | undefined;
let contexto: gsap.Context | undefined;
const limpiezas: (() => void)[] = [];

// Lenis avanza con el reloj de GSAP: scroll suave y ScrollTrigger van sincronizados
const tick = (tiempo: number) => lenis?.raf(tiempo * 1000);

/** El respaldo CSS ya lo mostró (el módulo llegó tarde): no se vuelve a ocultar. */
const yaVisible = (el: Element) => getComputedStyle(el).opacity !== '0';

/** «MOLIENDA»: las letras suben dentro de su línea, al cargar. */
function titular(raiz: ParentNode) {
  const h1 = raiz.querySelector<HTMLElement>('h1[data-revelar="titulo"]');
  if (!h1 || yaVisible(h1)) return;
  SplitText.create(h1, {
    type: 'chars',
    mask: 'chars',
    charsClass: 'letra',
    aria: 'auto',
    onSplit: (self) => gsap.from(self.chars, { yPercent: 105, duration: 1, ease: SALIDA, stagger: 0.045, delay: 0.15 }),
  });
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
          stagger: 0.1,
          scrollTrigger: { trigger: h2, start: AL_ENTRAR, once: true },
        }),
    });
  });
}

/** La tira terracota del hero: sube y aparece justo después del titular. */
function tira(raiz: ParentNode) {
  const el = raiz.querySelector<HTMLElement>('[data-revelar="tira"]');
  if (!el || yaVisible(el)) return;
  gsap.from(el, { y: 24, opacity: 0, duration: 0.9, ease: SALIDA, delay: 0.45 });
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
      stagger: 0.08,
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

/**
 * Sello de la cabecera: al entrar en cada sección se «estampa» su variante (escala 1,15 → 1
 * y opacidad). El enlace de la sección activa se marca en terracota (aria-current).
 */
function selloCabecera(raiz: ParentNode) {
  const sellos = [...raiz.querySelectorAll<SVGElement>('[data-sello-cabecera] svg[data-variante]')];
  const enlaces = [...raiz.querySelectorAll<HTMLAnchorElement>('[data-cabecera] nav a')];
  if (!sellos.length) return;
  let actual = 'sol';
  gsap.set(sellos, { autoAlpha: (i: number) => (sellos[i]!.dataset['variante'] === actual ? 1 : 0), transformOrigin: '50% 50%' });

  const estampar = (variante: string) => {
    if (variante === actual) return;
    actual = variante;
    for (const s of sellos) {
      if (s.dataset['variante'] === variante) {
        gsap.fromTo(s, { autoAlpha: 0, scale: 1.15 }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'power2.out', overwrite: true });
      } else {
        gsap.to(s, { autoAlpha: 0, duration: 0.2, ease: 'power2.out', overwrite: true });
      }
    }
  };

  raiz.querySelectorAll<HTMLElement>('[data-seccion]').forEach((seccion) => {
    ScrollTrigger.create({
      trigger: seccion,
      start: 'top 45%',
      end: 'bottom 45%',
      onToggle: (self) => {
        if (!self.isActive) return;
        estampar(seccion.dataset['seccion'] ?? 'sol');
        for (const a of enlaces) {
          if (a.hash === `#${seccion.id}`) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        }
      },
    });
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
    gsap.to(cabecera, { yPercent: si ? 0 : -100, duration: 0.35, ease: 'power2.out', overwrite: true });
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
    titular(document);
    tira(document);
    titulos(document);
    platos(document);
    fotos(document);
    selloCabecera(document);
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
