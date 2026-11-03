---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Inicio de Molienda (página única)

- **Modo:** Persuade. Visitante: cliente del café en el móvil (simulado) y quien evalúa a [A]nkordev (real). Acción: llegar a la carta y saber cuándo abre.
- **Contenido:** carta con precios ficticios rotulados, procedencia por café, horario y zona ficticios, aviso de concepto. Sin reseñas ni cifras.
- **Restricciones:** constitución (II 1.3.0: nada que recalcule el diseño; contenido visible sin JS; AA; reduced-motion = nada se mueve); nada comercial real; fotos de stock con créditos.
- **Momento memorable:** el sello de la cabecera se vuelve a estampar al entrar en cada sección.
- **Pendiente:** las tipografías exactas (deben estar en @fontsource y no ser las de la lista de evitar), las fotos concretas y el dibujo del sello.

## Direction contract

THESIS: Molienda como identidad de cafetería andina de los noventa: un sol grabado sobre el páramo, papel kraft rasgado y mayúsculas muy espaciadas. Rechaza el hero partido «titular serif + foto de taza» de todo café de especialidad.

OWN-WORLD: fondo kraft/pergamino; tinta espresso (fijada por el usuario); terracota solo para la acción principal y el estado activo; oliva para las franjas de sección; mostaza de frailejón como acento mínimo. Bordes de papel rasgado como recurso SVG estático (nunca polígonos de `clip-path`). Sello grabado circular. Mayúsculas romanas serif muy espaciadas para los titulares y sans humanista para el texto. Esquinas rectas, sin sombras: la profundidad sale solo del papel superpuesto. Excepción pedida por el usuario el 2026-11-03: los productos van en tarjetas semirredondeadas de pergamino que, con ratón, se elevan con una sombra debajo (la sombra solo cambia de opacidad).

STORY: el visitante entiende que es un café de Mérida que sirve grano de fincas cercanas, ve precios y horario sin buscar, cree que el sitio está hecho con oficio, y baja a la carta.

FIRST VIEWPORT: navegación centrada en mayúsculas espaciadas; sello grabado centrado (sol sobre la montaña); «MOLIENDA» enorme y espaciado; tira terracota rasgada con el lema; aviso de concepto; una fila de tres cafés con precio y procedencia (finca ficticia · región · altitud) visible sin scroll; «Ver la carta» como acción principal; estado «Abierto ahora», calculado con la hora de Mérida.

FORM: challenger brand-identity-canon-village-coffeehouse-identity (las secciones son estaciones de un mapa, al cambiar de sección se estampa una marca nueva en la cabecera y el estado activo se calienta a terracota), elegido por el usuario frente a la asignada, la n.º 6 de la lista propia (ruana merideña). seed:7adb036359871fd0. Movimiento: re-estampado del sello (escala + opacidad); fotos que se revelan dentro de marcos de papel rasgado (suben 50 px, escala 1,12→1, ~1,2 s, cubic-bezier(.22, 1, .36, 1), medido en noovolife) y zoom lento ligado al scroll; platos escalonados; los días cerrados aparecen como franjas apagadas.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
