# Tareas 001 — Sitio de Molienda

> Una tarea a la vez. Marca `[x]` al terminar, ejecuta `npm test` y haz commit convencional.
> Es la tarea T27 del portafolio [A]nkordev. Sin despliegue en esta fase.

## Fase 0 — Definición

- [x] M00 Carpeta propia, constitución (copia), `PRODUCT.md`, spec, plan, tareas y dirección visual (impeccable: «Cafetería de pueblo»)

**Hecho cuando:** el usuario aprueba la spec y la dirección.

## Fase 1 — Base

- [x] M01 Proyecto Astro + Tailwind + TypeScript estricto con las dependencias del plan §2; Vitest y Playwright; `npm test` — *e2e en el puerto 4339; Astro 7.4.4 con excepción puntual a `min-release-age` (plan §2)*
- [x] M02 Tokens en `global.css` + test de contraste; fuentes; `Base.astro` — *terracota `#9c4124` y oliva `#55542b` elegidas por contraste; superficies del navegador (selección, foco, caret, scrollbar) en la paleta*
- [x] M03 `opening-hours.ts` + tests unitarios (primero los tests) — *hora de America/Caracas con `Intl`, sin librerías; textos en `es.json` con «a la 1» / «a las 7»*

## Fase 2 — Contenido y estética (impeccable)

- [x] M04 Recursos: sello SVG con sus variantes y bordes rasgados; fotos con créditos — *fotos de Wikimedia Commons (plan §9); bordes generados con `scripts/generar-bordes.mjs`*
- [x] M05 Página: cabecera, primer viewport, origen, carta, galería, horario y pie, con los textos en `es.json` y los datos en `carta.ts`/`horario.ts` — *carta antes que origen (spec §4); `tokens.test.ts` lee el CSS con `?raw` (sin tipos de Node)*
- [x] M06 Tests e2e 1, 2, 4 y 5 + axe — *la acción cabe sin scroll a 1280×720, 1366×768 y 1440×900 (el hero escala también con la altura); axe solo con JS (es un script inyectado)*

## Fase 3 — Movimiento

- [x] M07 `animations.ts`: revelado de fotos, platos, titulares, sello y cabecera; test e2e 3 (reduced-motion) — *Lenis solo con puntero fino: en táctil desviaba los enlaces a secciones (plan §6)*
- [x] M08 Afinado con transitions-polish — *8 valores (escalonados, sello, cabecera, hover de la tarjeta); revelado de fotos intacto (plan §6)*

## Fase 4 — Cierre

- [ ] M09 Revisión visual a 375, 768 y 1440 px (design-taste-frontend), revisión final de impeccable y `DESIGN.md`
- [ ] M10 Lighthouse móvil en local con los umbrales de la constitución

**Al terminar cada fase:** parar y esperar revisión.
