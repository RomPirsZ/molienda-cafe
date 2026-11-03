# Plan técnico 001 — Sitio de Molienda

> Cómo se construye lo definido en `spec.md`. Debe cumplir `docs/constitution.md`.

---

## 1. Chequeo de constitución

| Principio | Cómo se cumple |
|---|---|
| I. Contenido primero | Astro genera HTML estático. Las animaciones son una capa: el estado inicial oculto lo pone JS, nunca el CSS. Sin JS se ve todo, también el horario completo. |
| II. Movimiento con propósito | GSAP solo sobre `transform` y `opacity`. Sin `filter` (el «estampado» del sello es escala + opacidad) y sin WebGL. Con `prefers-reduced-motion` no se inicia nada. |
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
- **Platos:** opacidad 0→1 y 30 px→0, escalonados 0,08 s.
- **Titulares y etiquetas:** suben dentro de una máscara de línea (`overflow: hidden` + `translateY`).
- **Sello de la cabecera:** al entrar en una sección cambia la variante con escala 1,15→1 y opacidad, en 0,35 s.
- **Cabecera:** se oculta al bajar y vuelve al subir (`translateY`).

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

Stock con licencia libre (Unsplash): taza de cerámica, barra, panadería, cafetal andino y grano. Se descargan, se optimizan con `astro:assets` y se citan en el pie. Ninguna se presenta como un local o un cliente real. Si falta una foto decisiva, una ilustración con canvas-design en la paleta del sitio.
