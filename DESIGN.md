---
name: Molienda
description: Cafetería de pueblo andina de los noventa — papel kraft rasgado, sello grabado y mayúsculas romanas muy espaciadas.
colors:
  papel: "#e8dcc2"
  papel-claro: "#f3ebdc"
  tinta: "#2b1c14"
  tinta-suave: "#5c4636"
  accion: "#9c4124"
  franja: "#55542b"
  acento: "#c99a2e"
  linea: "#8c7a5e"
typography:
  marca:
    fontFamily: "Marcellus, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.5rem, 0.9rem + 6.6vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "0.18em"
  titulo:
    fontFamily: "Marcellus, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.75rem, 1.2rem + 2.2vw, 3.25rem)"
    fontWeight: 400
    letterSpacing: "0.18em"
  plato:
    fontFamily: "Marcellus, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.6vw, 1.625rem)"
    fontWeight: 400
  cuerpo:
    fontFamily: "Alegreya Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  etiqueta:
    fontFamily: "Alegreya Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.8125rem, 0.78rem + 0.1vw, 0.875rem)"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.24em"
  cifras:
    fontFamily: "Alegreya Sans, ui-sans-serif, system-ui, sans-serif"
    fontFeature: "tnum, lnum"
rounded:
  recto: "0"
  miniatura: "0.5rem"
  tarjeta: "0.75rem"
spacing:
  gutter-movil: "1rem"
  gutter: "2.5rem"
  contenedor: "75rem"
components:
  boton-accion:
    backgroundColor: "{colors.accion}"
    textColor: "{colors.papel-claro}"
    typography: "{typography.etiqueta}"
    rounded: "{rounded.recto}"
    padding: "0.85rem 1.6rem"
    height: "3rem"
  boton-accion-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel-claro}"
  tarjeta-plato:
    backgroundColor: "{colors.papel-claro}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.tarjeta}"
    padding: "0.75rem 1rem 0.85rem 0.75rem"
  miniatura-plato:
    backgroundColor: "{colors.papel}"
    rounded: "{rounded.miniatura}"
    size: "4.5rem"
  cabecera:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    typography: "{typography.etiqueta}"
    height: "4.5rem"
  enlace-nav-activo:
    textColor: "{colors.accion}"
  marco-foto:
    backgroundColor: "{colors.papel-claro}"
    rounded: "{rounded.recto}"
    padding: "0.85rem"
  franja-origen:
    backgroundColor: "{colors.franja}"
    textColor: "{colors.papel-claro}"
  franja-visitanos:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel-claro}"
  tira-lema:
    backgroundColor: "{colors.accion}"
    textColor: "{colors.papel-claro}"
    typography: "{typography.etiqueta}"
    padding: "0.35rem 1rem"
---

# Design System: Molienda

## Overview

**Creative North Star: "La Cafetería de Pueblo"**

Molienda es la identidad de una cafetería andina de los noventa: un sol grabado sobre el páramo, papel kraft rasgado y mayúsculas romanas muy espaciadas. La página entera es una mesa de papeles: un suelo kraft con fibra, tiras de color de canto rasgado que marcan las secciones y fotos pegadas en passe-partouts de pergamino, ligeramente giradas y superpuestas. Todo es plano y de esquina recta; la profundidad la da el papel encima de otro papel.

La densidad es la de una carta impresa: listas con línea de puntos entre el plato y el precio, cifras tabulares, procedencia en letra pequeña. El tono visual es de oficio, no de lujo; rechaza de forma expresa el hero partido «titular serif + foto de taza» de todo café de especialidad.

La única concesión al relieve es la tarjeta de producto, pedida por el usuario (2026-11-03): pergamino semirredondeado que, con ratón, se eleva y proyecta una sombra. Es una excepción con nombre, no la regla.

**Key Characteristics:**
- Suelo kraft con fibra raster estática; tiras de color con canto de papel rasgado.
- Sello grabado circular (xilografía) como marca y como indicador de sección.
- Mayúsculas romanas (Marcellus) muy espaciadas para la marca y los títulos; sans humanista (Alegreya Sans) para el texto.
- Esquinas rectas y sin sombras, salvo la tarjeta de producto y su miniatura.
- Movimiento editorial: revelados enmascarados, fotos que suben dentro de su marco, sello que se re-estampa; con reduced-motion no se carga nada.

## Colors

Paleta de tierra cálida y baja saturación: papel, tinta espresso y tres pigmentos (terracota, oliva, mostaza) con funciones estrictas. Los hex solo existen en `:root` de `src/styles/global.css`; los componentes usan los roles (un test lo comprueba).

### Primary
- **Terracota de Acción** (`accion`): la acción principal («Ver la carta»), la tira del lema del hero, el enlace de la sección activa (`aria-current`), el punto de «Abierto ahora» y el cursor de texto. Como texto vale sobre los dos papeles (4,83:1 sobre kraft, 5,55:1 sobre pergamino).

### Secondary
- **Oliva de Franja** (`franja`): fondo de la franja de sección Origen, con texto en pergamino (6,59:1).

### Tertiary
- **Mostaza de Frailejón** (`acento`): acento mínimo. El sol del sello (adorno) y, como texto, solo sobre espresso (6,37:1): estado de apertura, título «Horario», «Cerrado», subrayado del día de hoy. Sobre oliva solo llega a 3,03:1 (texto grande o adorno); sobre papel, 1,9:1: nunca texto sobre papel.

### Neutral
- **Kraft** (`papel`): el suelo de la página (con la tesela de fibra), la cabecera y el fondo de reserva de las miniaturas.
- **Pergamino** (`papel-claro`): superficies superpuestas (tarjetas, passe-partouts), la fibra clara de los cantos rasgados y el texto sobre rellenos de color.
- **Espresso** (`tinta`, fijado por el usuario): texto, trazos del sello, anillo de foco, selección y la franja de Visítanos.
- **Tinta Suave** (`tinta-suave`): texto secundario (avisos, procedencias, créditos, notas); 6,48:1 sobre kraft.
- **Filete** (`linea`): líneas decorativas (borde de la cabecera, líneas de puntos de la carta, borde de tarjeta al 55 %, separadores del horario). Nunca texto.

### Named Rules
**La Regla de los Pares Probados.** Solo llevan texto los pares que `tests/unit/tokens.test.ts` comprueba a 4,5:1: tinta y tinta suave sobre los dos papeles, terracota sobre los dos papeles, pergamino sobre terracota, oliva y espresso, y mostaza sobre espresso. Un par nuevo entra primero en el test.

**La Regla de la Terracota Escasa.** La terracota es la acción, lo activo (incluido el hover de enlaces) y la única tira del lema. Si una pantalla tiene terracota en algo que no se pulsa, no está activo y no es esa tira, sobra.

**La Regla de la Mostaza Nocturna.** La mostaza solo se lee como texto sobre espresso; en cualquier otro fondo es adorno.

## Typography

**Display Font:** Marcellus (con Iowan Old Style, Georgia, serif), solo peso 400.
**Body Font:** Alegreya Sans (con ui-sans-serif, system-ui, sans-serif): 400, 400 itálica y 500.

Ambas autoalojadas con `@fontsource` (subconjunto latin), cargadas en `src/layouts/Base.astro`.

**Character:** romanas de rótulo grabado, abiertas y muy espaciadas, frente a una sans humanista cálida y legible: el letrero de la puerta y la letra de la carta.

### Hierarchy
- **Marca** (Marcellus 400, `--text-marca`, interlineado 0,9, tracking 0,18em, mayúsculas): solo «MOLIENDA» en el hero.
- **Título** (Marcellus 400, `--text-titulo`, tracking 0,18em, mayúsculas): títulos de sección (Carta, La casa, Visítanos). **Excepción del título largo:** «De la finca a la taza» va a 0,08em, porque a 0,18em pasaría de dos a tres líneas en el móvil. La regla de las dos líneas manda sobre el tracking.
- **Categoría** (Marcellus 400, 1,5rem, tracking 0,12em, mayúsculas, filete inferior de 2px en tinta): Café, Panadería, Desayunos.
- **Plato** (Marcellus 400, `--text-plato`, caja mixta): nombres de platos y de la zona; baja a 1,25rem en la carta de tres columnas.
- **Cuerpo** (Alegreya Sans 400, `--text-cuerpo`, 1,55): texto corrido, medidas de 26–38rem.
- **Etiqueta** (Alegreya Sans 500, `--text-etiqueta`, tracking 0,24em, mayúsculas): navegación, lema, avisos de la carta, estado de apertura, títulos de bloque menores, botón.
- **Secundario** (Alegreya Sans 400, 0,875–0,9375rem, tinta suave): procedencias, notas, créditos; el aviso de concepto va en itálica.

### Named Rules
**La Regla del Rótulo.** Marcellus se escribe en mayúsculas y espaciada cuando rotula (marca, secciones, categorías); en caja mixta solo nombra (platos, zona). Nunca en negrita.

**La Regla del Centrado Real.** Todo título centrado con tracking compensa el aire de la última letra con un margen derecho negativo igual al tracking.

**La Regla de las Cifras en Columna.** Precios, altitudes y horas llevan cifras tabulares y de caja alta.

## Layout

Un único contenedor centrado de 75rem como máximo, con márgenes laterales de 1rem en móvil y 2,5rem desde 48rem. Las franjas de color (tira del lema, Origen, Visítanos) rompen el contenedor a todo el ancho; la tira del lema llega a 60rem como máximo.

- **Primer viewport:** composición centrada y simétrica (sello, marca, tira, texto, acción, tres cafés). Las tres tarjetas destacadas van en fila desde 64rem; debajo, apiladas.
- **Carta:** una columna por debajo de 56rem; entre 56 y 80rem cada categoría ocupa el ancho y sus platos van en dos columnas; tres columnas de categoría solo desde 80rem.
- **Galerías (Origen, Ambiente):** retícula de 12 columnas donde las fotos se solapan con márgenes negativos y giros fijos de 1,5–2,5°.
- **Cabecera:** dos columnas (sello | nav) en móvil; tres (sello | nav centrada | estado) desde 64rem. El estado de apertura vive en el hero por debajo de 64rem.
- **Ritmo vertical:** bandas de sección con relleno fluido `clamp(2.5–3rem, 6–8vw, 5–6rem)`; espaciados del primer viewport ligados también a la altura (`vh`) para que la acción quepa en portátiles de 720–768px.

## Elevation & Depth

El sistema es plano. La profundidad sale solo del papel superpuesto: tiras rasgadas sobre el kraft, passe-partouts que se solapan y giran, la cabecera opaca sobre el contenido. No hay sombras en reposo en ningún elemento.

### Shadow Vocabulary
- **Elevación de tarjeta** (`box-shadow: 0 1.1rem 1.6rem -1rem color-mix(in srgb, var(--tinta) 55%, transparent), 0 0.3rem 0.6rem -0.35rem color-mix(in srgb, var(--tinta) 30%, transparent)`): solo en el hover con ratón de la tarjeta de producto. Vive en un pseudo-elemento con opacidad 0 y solo anima su opacidad.

### Named Rules
**La Regla del Papel Encima.** Para separar planos se superpone papel (solape, giro, canto rasgado); nunca una sombra.

**La Regla de la Excepción Única.** La única sombra del sistema es la de la tarjeta de producto, aparece solo con hover de puntero fino y nunca se anima `box-shadow`: se anima la opacidad de una capa que ya la lleva.

## Shapes

Esquinas rectas en todo: botón, franjas, marcos de foto, cabecera, horario. Las dos únicas curvas son la tarjeta de producto (0,75rem) y su miniatura cuadrada (0,5rem), por petición del usuario. Los círculos se reservan para el sello y los puntos (estado de apertura, estaciones del recorrido).

El canto rasgado es la silueta propia del mundo y existe en tres formas, todas como máscaras SVG estáticas de `src/assets/marcas/`:
- **Tiras** (`PapelRasgado`): canto superior o inferior de una franja de color, dos capas (fibra en pergamino + color de la franja) y dos cortes alternos para que dos bordes seguidos no coincidan.
- **Cuatro cantos** (passe-partout de foto): tiras en los cuatro lados con `mask-repeat: round`, para que las dos esquinas acaben rasgadas.
- **Arriba y abajo** (botón de acción): laterales rectos, como la tira del lema.

### Named Rules
**La Regla del Canto Quieto.** El papel rasgado es siempre una máscara SVG estática; nunca un polígono de `clip-path` y nunca se anima.

**La Regla de la Fibra Medida.** La fibra (tesela raster de 180px, ~13 KB) va en el suelo y en los passe-partouts, no en las tarjetas: con imagen de fondo la tarjeta del primer viewport pasaba a ser el LCP.

## Components

### Buttons
Una sola acción principal, de papel terracota rasgado.
- **Shape:** rectángulo con cantos superior e inferior rasgados (máscara en un `::before`, para que el anillo de foco no se recorte), mínimo 3rem de alto.
- **Primary:** relleno terracota, texto pergamino en etiqueta de 0,875rem con tracking 0,24em; flecha SVG de trazo a 1,25rem.
- **Hover / Focus:** el relleno pasa a espresso; foco con contorno de 2px en tinta y 3px de separación (global).

### Cards / Containers
La tarjeta de producto, la excepción semirredondeada.
- **Corner Style:** 0,75rem.
- **Background:** pergamino liso, sin fibra.
- **Border:** 1px de filete al 55 %.
- **Shadow Strategy:** ver Elevation & Depth; con ratón sube 0,25rem (`translateY`) y aparece la sombra. Entrada 250ms, salida 350ms, `cubic-bezier(0.22, 1, 0.36, 1)`. Con reduced-motion no sube ni transiciona; la sombra sigue señalando el hover.
- **Internal Padding:** 0,75rem 1rem 0,85rem 0,75rem (carta); más ajustado en el hero.
- **Contenido:** miniatura cuadrada a la izquierda (4,5rem; 4rem en tres columnas; 3,5rem en el hero), nombre en Marcellus, precio con cifras tabulares unido por una línea de puntos en filete, descripción y procedencia «finca · región · altitud» en tinta suave.

### Navigation
- **Cabecera** fija, kraft opaco con filete inferior; sello compacto a la izquierda (enlace al inicio), tres enlaces en etiqueta, estado de apertura a la derecha en escritorio. Sin menú desplegable: los tres enlaces caben en móvil.
- **Estados:** reposo en tinta; hover en terracota subrayado; sección activa en terracota (`aria-current`).
- **Comportamiento:** se oculta al bajar (150ms) y vuelve al subir (250ms); nunca mientras contiene el foco.

### Sello grabado
Firma del sistema: SVG circular de 200×200 a trazo `currentColor` (xilografía con rayado en las laderas en sombra), con el sol en mostaza. Variantes `sol`, `taza`, `grano`, `puerta` en la misma retícula; versión compacta sin anillo de texto ni cielo rayado para tamaños pequeños. En la cabecera se re-estampa la variante de cada sección al entrar en ella (inicio `sol`, carta `taza`, origen `grano`, la casa `sol`, visítanos `puerta`: dos secciones seguidas nunca comparten variante) (escala 1,15→1 y opacidad, 250ms, ease-in-out simétrico).

### Marco de foto
Passe-partout de pergamino con fibra y cuatro cantos rasgados (0,6rem de relleno; 0,85rem desde 48rem), ventana con `overflow: hidden`. Sin sombra; se solapan y giran entre sí.

### Franjas de sección
Bandas a todo el ancho con canto rasgado arriba y abajo: oliva (Origen), espresso (Visítanos) y la tira terracota del lema. Texto en pergamino.

### Horario
Lista de días en la franja espresso con separadores en filete; el día cerrado no se omite: va como fila rayada (líneas de pergamino al 10 %, 45°) con «Cerrado» en mostaza; el día de hoy, subrayado en mostaza de 2px.

### Estado de apertura
Etiqueta con punto circular: terracota y opaco si está abierto, del color del texto al 45 % si está cerrado. Se calcula en el navegador con la hora de Mérida; sin JS queda oculto.

### Pie
Sello completo, aviso de concepto y créditos de cada foto (autor, licencia, cambios) en tinta suave, en dos columnas desde 48rem.

### Movimiento
Solo `transform` y `opacity`; ninguna propiedad de diseño. Curva de salida común `power4.out` (equivalente GSAP de `cubic-bezier(0.22, 1, 0.36, 1)`, medida en noovolife).
- **Revelado de foto:** el marco sube 50px (1,2s) y aparece (0,6s); la foto pasa de escala 1,12 a 1 (1,2s); después, zoom ligado al scroll hasta 1,08.
- **Títulos:** «MOLIENDA» por letras enmascaradas (0,5s, escalonado 40ms); títulos de sección por líneas enmascaradas (0,9s, escalonado 80ms).
- **Platos:** entran escalonados 40ms (sube 30px, 0,9s).
- **Disparo:** al 92 % del viewport, una sola vez.
- **Scroll suave:** Lenis solo con puntero fino; en táctil, el scroll nativo.
- **Reduced-motion:** el módulo de animaciones no se descarga. Sin JS o si el módulo tarda más de 2,5s, todo se muestra.

## Do's and Don'ts

### Do:
- **Do** usar los roles de color (`var(--tinta)`, `bg-accion`…); los hex solo viven en `:root` de `global.css`.
- **Do** añadir al test de contraste cualquier par nuevo de texto sobre fondo antes de usarlo.
- **Do** dar profundidad superponiendo papel: solape, giro de 1,5–2,5° y canto rasgado.
- **Do** rotular en Marcellus mayúscula con tracking 0,18em y compensar el tracking al centrar.
- **Do** poner precios, altitudes y horas con cifras tabulares, y unir plato y precio con la línea de puntos.
- **Do** mantener las esquinas rectas salvo en la tarjeta de producto (0,75rem) y su miniatura (0,5rem).
- **Do** animar solo `transform` y `opacity`, y dejar todo visible sin JS y con reduced-motion.

### Don't:
- **Don't** recortar el papel rasgado con polígonos de `clip-path` ni animar sus cantos.
- **Don't** poner sombras fuera del hover de la tarjeta de producto, ni animar `box-shadow`.
- **Don't** poner la mostaza como texto sobre papel ni el filete como color de texto.
- **Don't** usar la terracota fuera de la acción principal, los estados activos o de hover y la tira del lema.
- **Don't** poner fibra de papel en las tarjetas.
- **Don't** usar Marcellus en negrita ni Alegreya Sans en mayúsculas sin tracking.
- **Don't** volver al hero partido «titular serif + foto de taza».
