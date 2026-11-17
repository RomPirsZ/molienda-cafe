# Tareas 001 — Sitio de Molienda

> Una tarea a la vez. Marca `[x]` al terminar, ejecuta `npm test` y haz commit convencional.
> Es la tarea T27 del portafolio [A]nkordev. Fases 0–4 sin despliegue; la Fase 5 (2026-11-17) rediseña y despliega.

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

- [x] M09 Revisión visual a 375, 768 y 1440 px (design-taste-frontend), revisión final de impeccable y `DESIGN.md`
  - Revisión visual (2 rondas): foto ilustrativa por producto (pedido del usuario), procedencia legible, «Ver la carta» en el primer viewport del móvil, sin desbordamiento a 768 px y carta en tres columnas solo desde 1280 px.
  - Revisión final de impeccable: «fix» y después «ship», con las 7 correcciones resueltas (marcos y botón rasgados, sello grabado, fibra de papel, La casa, pie).
  - `DESIGN.md` escrito por el documentador.
- [x] M10 Lighthouse móvil en local con los umbrales de la constitución
  - Lighthouse 13.5.0 por npx, con el permiso del usuario y sin añadirlo al proyecto.
  - Resultado: rendimiento 99–100, accesibilidad 100, buenas prácticas 100 y SEO 100; LCP 1,4–1,8 s y CLS 0,009.
  - La fibra se quitó de las tarjetas porque convertía una de ellas en el LCP.

## Fase 5 — Rediseño oscuro y despliegue (spec §10, plan §11; 2026-11-17)

- [x] M11 Dirección nueva con impeccable (context, craft-floor y contrato nuevo), tokens oscuros, tipografía (con aprobación si hay que instalar) y `tokens.test.ts` actualizado — *dirección fijada por el usuario («La noche andina»), titular «La finca queda aquí arriba»; Sofia Sans y Sofia Sans Extra Condensed 5.3.0 sustituyen a Marcellus y Alegreya Sans*
- [x] M12 Ilustración SVG de la fachada y hero nuevo: titular, estado de apertura, «Ver la carta» y aviso de concepto — *casona con ventanas que se apagan y placa del portón en vivo (cerrado: dice cuándo abre); los tres cafés van en una pizarra de acera en HTML*
- [x] M13 Panel lateral `<dialog>` con los 5 bloques, más la navegación del pie sin JS; e2e de teclado, Esc, foco y sin JS — *cajón con scroll-snap (modern-web-guidance «navigation-drawer»)*
- [x] M14 «Para llevar»: `ticket.ts` (tests unitarios primero), componente y e2e — *suma en céntimos, tope de 20 por producto; barra fija con el total en el móvil*
- [x] M15 Carta, cafés de origen, ambiente, visítanos y pie en la estética nueva; retirar lo que ya no se use; movimiento revisado — *fuera el sello, el papel rasgado, la fibra y `generar-bordes.mjs`; sin estilos en línea (la CSP solo `self`)*
- [x] M16 Cierre visual: polish y critique de impeccable, revisión de Taste a 375, 768 y 1440 px, `DESIGN.md`, axe y Lighthouse móvil — *revisión final de impeccable: «fix» (8 correcciones) y después «ship»; Taste: aplicadas las que no chocan con la spec; `DESIGN.md` reescrito; axe en los e2e. Lighthouse queda para M17, sobre la URL publicada*
- [x] M17 Despliegue: repo en GitHub (revisar el historial antes), `wrangler.jsonc`, `_headers`, Workers Builds y URL en vivo comprobada — *hecha 2026-11-17: https://molienda-cafe.ankordev.workers.dev desde RomPirsZ/molienda-cafe (público), con la CSP y las cabeceras del portafolio; astro 7.4.8 (0 vulnerabilidades). Lighthouse móvil en esta máquina: 100 en accesibilidad, buenas prácticas y SEO; rendimiento 84–93, en la misma franja ruidosa que el portafolio (76–97 aquí, 98 en su CI)*

**Al terminar cada fase:** parar y esperar revisión.
