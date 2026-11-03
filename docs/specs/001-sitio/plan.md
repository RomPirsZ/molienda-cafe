# Plan técnico 001 — Sitio de Molienda

> Cómo se construye lo definido en `spec.md`. Debe cumplir `docs/constitution.md`.

---

## 1. Chequeo de constitución

| Principio | Cómo se cumple |
|---|---|
| I. Contenido primero | Astro genera HTML estático. Las animaciones son una capa: el estado inicial oculto lo pone JS, nunca el CSS. Sin JS se ve todo, también el horario completo. |
| II. Movimiento con propósito | Hoy GSAP anima `transform` y `opacity`. La constitución 1.3.0 (2026-11-03) admite también `clip-path`, `mask`, filtros, color y sombras, pero nunca propiedades que recalculan el diseño. Sin WebGL. Con `prefers-reduced-motion` no se inicia nada. |
| III. Accesibilidad | HTML semántico, contraste AA medido por token (incluidos los textos sobre terracota y oliva), foco visible, axe en móvil y escritorio. |
| IV. Rendimiento | Salida estática, fuentes alojadas en el propio sitio, fotos con `astro:assets` (AVIF/WebP, `srcset`, diferidas salvo la primera), JS solo para el movimiento y el estado de apertura. |
| V. Seguridad | Sin servidor, formularios ni secretos. Cuando se despliegue, cabeceras como en el portafolio (CSP solo `self`). |
| VI. Testing | Vitest para la lógica (`opening-hours.ts`) y Playwright + axe para los flujos. |
| VII. Simplicidad | Sin framework de UI, CMS ni librería de fechas: la hora de Mérida sale de `Intl.DateTimeFormat`. |
| VIII. Spec antes que código | Esta spec, este plan y `tasks.md`. |
| IX. Bilingüe | Textos en `src/i18n/es.json` (solo español en v1). |
| X. Privacidad | Sin trackers ni peticiones a terceros. |

## 2. Stack

Mismas versiones fijadas que el portafolio:
- `astro` 7.4.4, `tailwindcss` 4.3.3 + `@tailwindcss/vite` 4.3.3, `gsap` 3.15.0 (core + ScrollTrigger) y `lenis` 1.3.27.
- **Fuentes** (`@fontsource`, 5.3.0):
  - `@fontsource/marcellus`: mayúsculas romanas con remates abiertos, para los titulares y el logotipo.
  - `@fontsource/alegreya-sans`: sans humanista para el texto.
  - Ninguna de las dos está en la lista de fuentes por defecto que hay que evitar.
- **Desarrollo:** `typescript` 6.0.3, `@astrojs/check` 0.9.12, `vitest` 5.0.5, `@playwright/test` 1.64.1 y `@axe-core/playwright` 4.14.0.
- **Sin** React, three, ShaderGradient, adaptador de Vercel ni Supabase.
- `.npmrc` igual que el portafolio: sin scripts de instalación, `min-release-age=7` y solo el registro de npm.

**Excepción 2026-11-03 (M01), aprobada por el usuario:** `astro@7.4.4` tenía 6 días publicada. Es la versión que el portafolio usa en producción desde el 30 de octubre. Se instaló con `--min-release-age=0 --before=2026-10-28T20:30:00Z`, para que la excepción no se extendiera a las dependencias transitivas. Verificado paquete a paquete: solo `astro` 7.4.4 y tres subpaquetes de su misma publicación (`@astrojs/markdown-satteri` 0.4.6, `@astrojs/prism` 4.1.2 y `@astrojs/telemetry` 3.4.2), los mismos que el portafolio, tienen menos de 7 días. Todo lo demás cumple la política. `npm audit`: 0.

## 3. Estructura

```
docs/constitution.md            (copia, solo lectura)
docs/specs/001-sitio/           spec.md, plan.md, tasks.md
PRODUCT.md · DESIGN.md (al terminar) · CLAUDE.md
src/
  assets/fotos/                 fotos de ambientación (+ créditos)
  assets/marcas/                sello y bordes rasgados (SVG)
  components/                   Cabecera, Sello, Carta, Plato, Origen, Galeria, Horario, Pie, PapelRasgado
  data/carta.ts                 platos, precios ficticios, procedencia
  data/horario.ts               horario ficticio
  i18n/es.json
  layouts/Base.astro
  lib/animations.ts             init/destroy, reduced-motion, Lenis + ScrollTrigger
  lib/opening-hours.ts          ¿abierto ahora? con la hora de America/Caracas
  pages/index.astro
  styles/global.css             tokens (@theme)
tests/unit/  tests/e2e/
```

## 4. Tokens

Los colores se definen como variables en `global.css` y Tailwind los expone con `@theme`. Ningún hex en los componentes. Roles: `--papel` (kraft), `--papel-claro` (pergamino), `--tinta` (espresso), `--accion` (terracota), `--franja` (oliva), `--acento` (mostaza) y `--linea`. Un test unitario verifica el contraste AA de cada par texto/fondo que se use, igual que `themes.test.ts` en el portafolio.

## 5. Papel rasgado y sello

- **Bordes rasgados:** SVG estáticos dibujados aposta (arriba y abajo, 2–3 variantes), colocados como máscara (`mask-image`) o como pieza superpuesta. Nunca polígonos de `clip-path` con muchos vértices, y nunca animados.
- **Sello:** un SVG propio, el sol sobre la montaña andina, con variantes por sección (taza para la carta, grano para el origen, puerta para visítanos), todas con la misma retícula circular.

## 6. Movimiento

`animations.ts` sigue el patrón de `sdd-portafolio/src/lib/animations.ts`: `initAnimations()` en `DOMContentLoaded`; si `matchMedia('(prefers-reduced-motion: reduce)')` coincide, no hace nada; Lenis se sincroniza con ScrollTrigger mediante `gsap.ticker`.

- **Revelado de fotos** (medido en noovolife): el marco sube 50 px → 0 mientras la foto pasa de escala 1,12 a 1, en 1,2 s con `cubic-bezier(.22, 1, .36, 1)`, al entrar en pantalla. Después, zoom lento ligado al scroll (`scrub`) hasta 1,08.
- **Platos:** opacidad 0→1 y 30 px→0, escalonados 0,04 s.
- **Titulares y etiquetas:** suben dentro de una máscara de línea (`overflow: hidden` + `translateY`).
- **Sello de la cabecera:** al entrar en una sección cambia la variante con escala 1,15→1 y opacidad, en 0,25 s y `ease-in-out` en los dos sentidos.
- **Cabecera:** se oculta al bajar y vuelve al subir (`translateY`). Nunca mientras tiene el foco del teclado.

**Cambios 2026-11-03 (M07):**
- **Lenis solo con puntero fino.** En táctil no suaviza nada (el scroll es nativo) y, como no sigue el desplazamiento del dedo, calculaba mal el destino de los enlaces a secciones: en el móvil «Ver la carta» se quedaba a medio camino. En táctil manda el scroll nativo con `scroll-behavior: smooth` (sin él, con reduced-motion). Lenis respeta el `scroll-padding-top` de la cabecera, así que no lleva `offset` propio.
- **Una línea de tiempo por foto**, con un solo disparador: GSAP modifica el objeto de `scrollTrigger` al crearlo, y compartirlo entre tres tweens dejaba sin revelar las fotos a las que se llegaba saltando.
- **Tarjetas:** durante la entrada se apaga su transición CSS y al acabar se limpian `transform`, `opacity` y `transition`, para que el hover vuelva a mandar.
- **Afinado (M08, transitions-polish):** con los valores literales de los tokens de transitions.dev (sin copiar `_root.css`).
  - Titular: 0,5 s con escalonado de 40 ms. Títulos de sección: escalonado de 80 ms. Platos: escalonado de 40 ms (≤ 300 ms en total).
  - Sello: 250 ms simétrico. Cabecera: vuelve en 250 ms y se aparta en 150 ms.
  - Tarjeta: entra en 250 ms y sale en 350 ms, sin rebote.
  - El revelado de fotos y las distancias de la referencia (noovolife) se mantienen: ningún token cubre ese uso.
- **Antes de que llegue el módulo,** lo que se va a revelar nace oculto con la clase `motion`, puesta por un script mínimo en `<head>`. Si el módulo no llega en 2,5 s, el CSS lo muestra igual.

## 7. Estado de apertura

`opening-hours.ts` exporta una función pura `estadoApertura(fecha, horario)` que devuelve `{ abierto, cambiaA }` calculado en `America/Caracas` con `Intl.DateTimeFormat`. Se prueba con fechas fijas: antes de abrir, en horario, al cerrar, en un día cerrado y con fechas en otra zona horaria. En el cliente se pinta al cargar y cada minuto. Sin JS, el bloque muestra el horario completo y nada más.

## 8. Testing

| Nivel | Qué |
|---|---|
| Estático | `astro check`, TypeScript estricto |
| Unitario | `opening-hours`, contraste de los tokens, coherencia de `carta.ts` (todo precio rotulado como ficticio y toda procedencia con región real) |
| E2E | 1) la página carga y el aviso de concepto se ve sin scroll · 2) sin JS se lee todo, horario incluido · 3) con reduced-motion no hay transformaciones en curso · 4) solo teclado · 5) ninguna petición fuera del propio origen |
| Accesibilidad | axe (WCAG 2.2 AA) en móvil y escritorio; falla con violaciones serias o críticas |

`npm test` = `vitest run && playwright test`, con el servidor en el puerto **4339**: ni el 4321 de `astro dev` (donde además inyecta scripts la extensión Console Ninja) ni el 4329 de los e2e del portafolio, porque con `reuseExistingServer` compartir puerto haría probar el sitio equivocado.

## 9. Fotos

**Cambio 2026-11-03 (M04):** de **Wikimedia Commons** en lugar de Unsplash. La API de búsqueda de Unsplash exige una clave; la de Commons es pública, y sus licencias se verifican foto a foto. Además tiene material andino real, como el pan andino.

Siete fotos en `src/assets/fotos/`: vista de la finca, hacienda, cafeto, pan andino, taza en la mano, tostador y preparación. Cada una tiene licencia CC0, CC BY o CC BY-SA, y su autor, licencia, enlace y texto alternativo están en `src/data/fotos.ts` y `es.json`; un test lo vigila. Se citan en el pie con «redimensionada» (2000 px de ancho, sin EXIF), y `astro:assets` genera las versiones para pantalla.

Se descartó la foto de un interior porque era un local real reconocible (Kitsuné Café, Montreal): presentarlo como el café ficticio sería engañoso. Ninguna foto se presenta como un local o un cliente real.

**Sello y bordes (plan §5):** `src/components/Sello.astro` (variantes `sol`, `taza`, `grano` y `puerta`, y `compacto` sin anillo de texto para tamaños pequeños) y `src/components/PapelRasgado.astro`. Los bordes salen de `scripts/generar-bordes.mjs` (semilla fija, tileables a 1200 px) y se usan como máscara: el canto claro y el color.

**Cambio 2026-11-03 (M09), pedido por el usuario:** cada producto lleva una **foto ilustrativa** en su tarjeta.
- Son 12 fotos más de Commons, en `src/assets/fotos/carta/`: recortadas en cuadrado a 600 px, con su crédito en el pie («recortada y redimensionada»). El pan andino reutiliza la foto que ya existía.
- La carta lo rotula: «fotos ilustrativas».
- Para la pisca andina no hay foto en Commons. Se usa una changua (caldo andino colombiano con huevo y cilantro), y su texto alternativo describe lo que se ve, sin decir que es pisca.
- Todas las fotos llevan su procedencia incrustada (`impeccable embed-prompt`).

## 10. Rendimiento medido (M10)

Lighthouse 13.5.0, perfil móvil, sobre el build de producción servido en local (2026-11-03):

| Categoría | Nota |
|---|---|
| Rendimiento | 99–100 |
| Accesibilidad | 100 |
| Buenas prácticas | 100 |
| SEO | 100 |

Métricas: FCP 1,1–1,5 s, LCP 1,4–1,8 s, TBT 60 ms y CLS 0,009.

Dos lecciones:
- **Fibra del papel.** Como SVG con `feTurbulence` bajaba el rendimiento a 91, porque se dibuja en el hilo principal. Ahora es raster.
- **Tarjetas sin fibra.** Como imagen de fondo de una tarjeta, convertía el primer café en el LCP, y no contaba como pintado hasta acabar su entrada animada.

