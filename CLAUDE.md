# Instrucciones para el agente — Molienda

Sitio de un café **ficticio**: proyecto 001 del portafolio [A]nkordev (T27). Se usa **SDD**. Antes de escribir código:

1. Lee `docs/constitution.md` (copia de la del portafolio, en solo lectura). Sus principios tienen prioridad sobre todo lo demás.
2. Lee `docs/specs/001-sitio/spec.md` (qué y por qué) y `plan.md` (cómo).
3. Trabaja según `docs/specs/001-sitio/tasks.md`:
   - Una tarea a la vez, en orden, con sus tests.
   - Al terminar: `npm test`, marca `[x]` y haz commit convencional (`feat:`, `fix:`, `test:`, `docs:`, `chore:`).
   - Al terminar cada **fase**, detente y espera revisión.
4. No agregues dependencias fuera del plan sin preguntar. Nunca instales nada (paquetes, skills, herramientas globales) sin preguntar primero.
5. Si la spec o el plan son ambiguos o contradicen la constitución, pregunta antes de seguir.

Textos de interfaz siempre en `src/i18n/es.json`.

## Producto y diseño

- `PRODUCT.md`: público, propósito y límites. **Nada comercial real**: sin pedidos, reservas, pagos, formularios, WhatsApp ni teléfonos. Nada de reseñas, cifras ni premios. Lo ficticio se rotula.
- Dirección visual: rediseño oscuro de la spec §10 (2026-11-17), que sustituye a «Cafetería de pueblo». Su contrato está en `.impeccable/surfaces/src-pages-index-astro.md` y al terminar se documenta en `DESIGN.md`.
- Orden de autoridad: **constitución → spec/plan → PRODUCT.md / contrato / DESIGN.md → guía de cualquier skill**.

## Herramientas

| Tarea | Herramienta |
|---|---|
| Construir UI, crítica, auditoría, pulido, `DESIGN.md` | **impeccable** (la principal) |
| Accesibilidad, textos de interfaz, UX móvil | **ux-designer** |
| Escribir HTML, CSS o JS de cliente nuevo (patrones modernos de la plataforma, compatibilidad Baseline, alternativas) | **modern-web-guidance**: `search` y `retrieve` antes de escribir; no `legacy-scan` ni auditorías salvo que se pidan. Si una guía choca con la constitución, el plan o `DESIGN.md`, mandan ellos |
| Revisión visual con capturas a varios anchos | **design-taste-frontend** (solo su revisión) |
| Afinar duraciones y curvas existentes | **transitions-polish** |
| Ilustraciones estáticas en la paleta del sitio | **canvas-design** |

Choques conocidos:
- **Movimiento (constitución II, 1.3.0):** se pueden animar `transform`, `opacity`, `clip-path`, `mask`, filtros (blur incluido), color, fondo, borde y `box-shadow`. Nunca propiedades que recalculan el diseño (`width`, `height`, `top`, `left`, `margin`…). Sin WebGL (el fondo WebGL es solo del portafolio). Si un skill propone otra cosa, se descarta.
- **Scripts:** nunca por CDN. GSAP y Lenis van por npm.
- **Fotos de stock:** solo como ambientación y con créditos.
- **Despliegue:** en Cloudflare Workers desde la Fase 5 (spec §10, plan §11). Cabeceras como en el portafolio; sin secretos.
