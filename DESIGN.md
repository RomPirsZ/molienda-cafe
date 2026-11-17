---
name: Molienda
description: La noche andina — una casona merideña al anochecer, ilustración plana, bloques de color a toda la altura y condensada negra en mayúsculas.
colors:
  noche: "#17110d"
  espresso: "#2a1e16"
  pergamino: "#ecdfc4"
  pergamino-suave: "#b8a68a"
  frailejon: "#b6c07a"
  kraft: "#c99560"
  tostado: "#6b4630"
  oliva: "#3d4a2a"
  pizarra: "#1c241a"
  luz: "#f2d9a0"
  linea: "#5c4838"
  monte: "#26301f"
  muro: "#3b2c22"
  teja: "#7a4a2e"
  apagado: "#4a3a2c"
typography:
  titular:
    fontFamily: "Sofia Sans Extra Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(3.25rem, 1.6rem + 6.4vw, 7.5rem)"
    fontWeight: 800
    lineHeight: 0.86
  titulo:
    fontFamily: "Sofia Sans Extra Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 3.6vw, 5rem)"
    fontWeight: 800
    lineHeight: 0.92
  bloque:
    fontFamily: "Sofia Sans Extra Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.75rem, 1.4rem + 1.4vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 0.95
  plato:
    fontFamily: "Sofia Sans Extra Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(1.375rem, 1.25rem + 0.5vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1
  cuerpo:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.55
  nota:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.4
  etiqueta:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.8125rem, 0.78rem + 0.1vw, 0.875rem)"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  boton:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 700
    lineHeight: 1
  cifras:
    fontFamily: "Sofia Sans, ui-sans-serif, system-ui, sans-serif"
    fontFeature: "tnum, lnum"
rounded:
  recto: "0"
spacing:
  gutter-movil: "1rem"
  gutter: "2.5rem"
  contenedor: "80rem"
  cabecera: "4rem"
components:
  boton-accion:
    backgroundColor: "{colors.frailejon}"
    textColor: "{colors.noche}"
    typography: "{typography.boton}"
    rounded: "{rounded.recto}"
    padding: "0.8rem 1.4rem"
    height: "3rem"
  boton-accion-hover:
    backgroundColor: "{colors.pergamino}"
    textColor: "{colors.noche}"
  boton-secciones:
    backgroundColor: "{colors.pergamino}"
    textColor: "{colors.noche}"
    typography: "{typography.boton}"
    rounded: "{rounded.recto}"
    padding: "0.5rem 1rem"
    height: "2.75rem"
  boton-secciones-hover:
    backgroundColor: "{colors.frailejon}"
  tarjeta:
    backgroundColor: "{colors.espresso}"
    textColor: "{colors.pergamino}"
    rounded: "{rounded.recto}"
    padding: "0.75rem 1rem 0.85rem 0.75rem"
  panel-bloque-pergamino:
    backgroundColor: "{colors.pergamino}"
    textColor: "{colors.noche}"
    typography: "{typography.bloque}"
    padding: "1rem 1.25rem 1.1rem"
  panel-bloque-frailejon:
    backgroundColor: "{colors.frailejon}"
    textColor: "{colors.noche}"
  panel-bloque-kraft:
    backgroundColor: "{colors.kraft}"
    textColor: "{colors.noche}"
  panel-bloque-tostado:
    backgroundColor: "{colors.tostado}"
    textColor: "{colors.pergamino}"
  panel-bloque-espresso:
    backgroundColor: "{colors.espresso}"
    textColor: "{colors.pergamino}"
  ticket:
    backgroundColor: "{colors.kraft}"
    textColor: "{colors.noche}"
    rounded: "{rounded.recto}"
    padding: "1.25rem 1.25rem 1.5rem"
  pizarra:
    backgroundColor: "{colors.pizarra}"
    textColor: "{colors.pergamino}"
    padding: "0.6rem 0.8rem 0.7rem"
    width: "13.5rem"
  placa-puerta:
    backgroundColor: "{colors.pergamino}"
    textColor: "{colors.noche}"
    rounded: "{rounded.recto}"
---

# Design System: Molienda

## Overview

**Creative North Star: "La noche andina"**

La página es la fachada de Molienda al anochecer: una casona merideña de muros de tierra, tejas de barro y ventanas con luz plana, con la cordillera detrás. Todo es plano: la ilustración no lleva degradados ni brillos, las superficies no llevan sombra y la profundidad sale de capas de color, de la montaña lejana al portón. Sobre ese suelo casi negro y cálido, el texto es pergamino y la única voz que llama a actuar es el verde frailejón.

La marca habla en Sofia Sans Extra Condensed negra en mayúsculas: titulares enormes, alineados a la izquierda, muy apretados. El texto corrido es Sofia Sans, tranquilo y legible. El color en bloque se reserva para lo que se pulsa o se lleva: el panel de secciones, de claro a oscuro, y el ticket caramelo de «Para llevar».

Un solo tema, oscuro. La casona está viva: si el café está cerrado, sus ventanas se apagan y la placa de la puerta dice CERRADO y cuándo abre.

**Key Characteristics:**
- Un solo tema oscuro (`color-scheme: only dark`), sin conmutador.
- Ilustración SVG plana: cada relleno es un token; nunca degradados.
- Esquinas rectas en todas las superficies.
- Plano en reposo: la única sombra es la elevación de la tarjeta de producto con ratón.
- Bloques de color a toda la altura como navegación.
- Condensada negra en mayúsculas para toda la voz display.

## Colors

Una paleta nocturna y terrosa: suelo de espresso casi negro, texto pergamino, un verde frailejón para la acción y los colores de la casona (caramelo, tostado, oliva) como bloques.

### Primary
- **Verde frailejón** (`frailejon`): la acción principal («Ver la carta»), lo activo (estado ABIERTO, el punto de apertura), el foco (`outline` de 2px), la selección, el cursor de texto y los títulos de categoría de la carta con su filete inferior de 2px.

### Secondary
- **Caramelo kraft** (`kraft`): todo lo de «Para llevar»: su bloque en el panel, el ticket y la barra del total en el móvil. Siempre con texto noche.

### Tertiary
- **Marrón tostado** (`tostado`): la madera de la casona (puerta, marcos, el caballete de la pizarra), el bloque «Horario» del panel y el pulgar de la barra de desplazamiento. Con texto pergamino.
- **Verde oliva profundo** (`oliva`): la montaña cercana, el zócalo de la casona y la franja de Origen, la única sección con fondo de color. Con texto pergamino.

### Neutral
- **Noche** (`noche`): el suelo de toda la página, la cabecera, la hoja del panel y el cielo de la fachada; texto sobre los bloques claros.
- **Espresso** (`espresso`): superficies elevadas (tarjeta de producto, último bloque del panel, hover de los botones de cantidad).
- **Pergamino** (`pergamino`): texto principal, primer bloque del panel, botón «Secciones», placa de la puerta.
- **Pergamino suave** (`pergamino-suave`): texto secundario, avisos, el pie; borde de la tarjeta al pasar el ratón.
- **Pizarra** (`pizarra`): solo el tablero de la pizarra de la acera.
- **Luz** (`luz`): la luz de las ventanas y la luna, plana. Al cerrar, las ventanas pasan a `apagado`.
- **Línea** (`linea`): filetes decorativos, bordes de tarjeta y de fila, la línea de puntos de la carta. Nunca texto.

### Solo ilustración
- **Monte** (`monte`), **Muro** (`muro`), **Teja** (`teja`), **Apagado** (`apagado`): la cordillera lejana, los muros de noche, las tejas de barro y las ventanas apagadas. Nunca texto ni fondo de UI.

### Named Rules
**The Un Solo Origen Rule.** Los hex viven solo en `:root` de `src/styles/global.css`; componentes e ilustración usan los roles. `tests/unit/tokens.test.ts` falla si aparece un hex fuera de ahí.

**The Par Probado Rule.** Solo se pone texto sobre un fondo si el par está en `tokens.test.ts` con AA (4,5:1): pergamino y pergamino suave sobre noche, espresso y pizarra; frailejón sobre noche, espresso y pizarra; noche sobre pergamino, frailejón, kraft y luz; pergamino sobre tostado y oliva. Un par nuevo entra primero en el test.

**The Claro a Oscuro Rule.** Los bloques de color van de claro a oscuro (pergamino, frailejón, kraft, tostado, espresso) y el texto cambia de noche a pergamino a mitad de la escala, en el tostado.

## Typography

**Display Font:** Sofia Sans Extra Condensed 800 (con Arial Narrow)
**Body Font:** Sofia Sans 400, 600, 700 y 400 itálica (con ui-sans-serif, system-ui)

**Character:** Una condensada negra, alta y estrecha, como los rótulos pintados de una fachada, sobre una sans humanista de lectura tranquila. Son de la misma familia, así que conviven sin pelearse. Se sirven en local con `@fontsource` (solo latín).

### Hierarchy
- **Titular** (800, `titular`, interlínea 0.86, máx. 15ch): solo el titular del hero, en dos líneas; en escritorio también se limita por la altura (12.5cqh) para caber sobre el tejado.
- **Título** (800, `titulo`, 0.92): títulos de sección, alineados a la izquierda, `text-wrap: balance`.
- **Bloque** (800, `bloque`, 0.95): nombres de los bloques del panel y título del ticket.
- **Plato** (800, `plato`, 1): nombres de producto en la carta. La misma voz a tamaños fijos: categorías 2rem, marca del pie 2.5rem, estaciones de Origen y marca de la cabecera 1.75rem, enlaces del pie 1.5rem.
- **Cuerpo** (400, `cuerpo`, 1.55, máx. ~34rem): texto corrido.
- **Nota** (400, `nota`, 0.9375rem, 1.4): avisos de concepto (en itálica), notas de la carta y de la casa, líneas del ticket, detalle de los bloques del panel y el pie, en pergamino suave.
- **Etiqueta** (600, `etiqueta`, 0.08em, mayúsculas): estado de apertura, título de la pizarra, títulos del pie y de las categorías para llevar.
- **Botón** (700, 1rem; 0.9375rem en cabecera y panel): textos de botón y del cierre del panel.

### Named Rules
**The Una Voz Display Rule.** Todo lo display (h1, h2, h3, marca, nombres de producto, bloques, placa) es Sofia Sans Extra Condensed 800 en mayúsculas. No hay otro peso ni otra familia display.

**The Cifras en Columna Rule.** Precios, cantidades y horas llevan cifras tabulares (`cifras`).

## Layout

Contenedor de 80rem centrado, con margen lateral de 1rem en el móvil y 2.5rem desde 48rem. La cabecera es fija arriba (4rem) y `scroll-padding-top` de 4.5rem evita que tape los destinos. Las secciones respiran con `padding-block` fluido (de ~3rem a 6–7rem).

El hero ocupa la pantalla bajo la cabecera: la fachada (proporción 2400:1000) lo llena por alto y se recorta por los lados, centrada en el portón; lo que va encima (letrero, placa, pizarra) se coloca en % y su letra se mide en `cqi`, así escala con el dibujo. Abajo, una franja de 6.5rem sobre la calle lisa lleva el estado y la acción. En el móvil (<48rem) la casona se recorta en puerta y ventanal a 300vw y el estado va debajo.

Las rejillas son asimétricas: Origen 5fr / 7fr con un collage de fotos en 12 columnas que se solapan; «Para llevar» con el ticket fijo a la derecha (22rem) desde 64rem; la carta en tres columnas solo desde 80rem y con dos columnas de platos entre 56rem y 80rem. Puntos de corte en uso: 48rem, 56rem, 64rem, 80rem.

## Elevation & Depth

Plano en reposo. La profundidad sale de capas de color (cielo noche, monte, oliva, muro, portón) y del paso de noche a espresso. La única sombra del sistema es la de la tarjeta de producto con ratón fino (excepción pedida por el usuario el 2026-11-03): la tarjeta sube 0.25rem y aparece una sombra que vive en un pseudo-elemento y solo cambia de opacidad. El fondo del panel abierto es la noche al 70 %, sin desenfoque.

### Shadow Vocabulary
- **Elevación de producto** (`box-shadow: 0 1.1rem 1.6rem -1rem color-mix(in srgb, black 80%, transparent), 0 0.3rem 0.6rem -0.35rem color-mix(in srgb, black 60%, transparent)`): solo en la tarjeta con `(hover: hover) and (pointer: fine)`; se anima la opacidad de la capa, nunca la sombra.

### Named Rules
**The Plano en Reposo Rule.** Nada lleva sombra en reposo. La única sombra es la elevación de la tarjeta de producto al pasar el ratón; cualquier otra necesita una nueva decisión del usuario.

## Shapes

Esquinas rectas (`recto`, 0) en botones, tarjetas, bloques, ticket, pizarra, placa, fotos y miniaturas. Las únicas formas redondas son las que el mundo dibuja: el punto del estado de apertura y la luna. Los bordes son finos: 1px `linea` en tarjetas y filas, 1px de puntos entre nombre y precio, 2px frailejón bajo las categorías, 1px discontinuo pergamino en el recorrido de Origen con estaciones cuadradas. La pizarra lleva un marco de madera de 0.4rem y dos patas inclinadas 6°.

## Components

### Buttons
Bloques planos, como los del panel.
- **Shape:** esquina recta (0), altura mínima 3rem (2.75rem en la cabecera y en los controles).
- **Primary (`boton-accion`):** frailejón con texto noche, Sofia Sans 700, icono SVG de 1.25rem; hover a pergamino en 200ms `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Secciones (`boton-secciones`):** pergamino con texto noche en la cabecera; hover a frailejón.
- **Cantidad:** cuadrados de 2.75rem, transparentes con icono pergamino; hover a espresso con icono frailejón; desactivado en `linea`.
- **Focus:** `outline` de 2px frailejón a 3px (a −5px dentro de los bloques del panel).

### Cards / Containers
- **Tarjeta de producto:** espresso, borde 1px `linea`, esquina recta, miniatura a la izquierda (4.5rem; 4rem en tres columnas). Con ratón sube 0.25rem, el borde pasa a pergamino suave y aparece la elevación de producto.
- **Fila de carta:** nombre en `plato`, línea de puntos `linea` hasta el precio, descripción en cuerpo y origen en pergamino suave a 0.875rem.

### Navigation
- **Cabecera:** fija, noche, «MOLIENDA» en condensada 1.75rem a la izquierda y «Secciones» a la derecha. Se esconde al bajar y vuelve al subir.
- **Pie (`#navegacion`):** enlaces en condensada 1.5rem pergamino, hover frailejón; es el respaldo sin JS del panel.

### Panel de secciones (firma)
Un `<dialog>` modal que entra desde la derecha con `scroll-snap` horizontal; la hoja mide `min(26rem, 88vw)` y cinco bloques planos a toda la altura (mín. 6.5rem) enlazan cada uno a su sección, de claro a oscuro: pergamino, frailejón, kraft, tostado, espresso. Nombre en `bloque` y detalle en 600 a 0.9375rem. Con ratón, el nombre se desplaza 0.5rem a la derecha. El fondo sigue a la hoja con `animation-timeline: scroll()` hasta la noche al 70 %.

### Fachada (firma)
La casona en SVG plano: cada relleno es un token. Las ventanas usan `luz`; con el café cerrado pasan a `apagado` (la del vecino sigue encendida). La placa de la puerta, pergamino con texto noche en condensada, dice ABIERTO o CERRADO y, cerrado, la hora de apertura, en vivo desde EstadoApertura.

### Pizarra de acera (firma)
Caballete en HTML real delante de la ventana derecha: tablero `pizarra` con marco y patas `tostado`, título en etiqueta frailejón y tres cafés con precio en 600. 13.5rem en escritorio, 8.75rem en el móvil.

### Ticket para llevar (firma)
Bloque kraft con texto noche, título en `bloque`, pie en etiqueta. Es una demostración: no envía nada. Fijo a la derecha desde 64rem; en el móvil, una barra kraft del total pegada abajo con un enlace noche al ticket.

### Movimiento
GSAP, solo sin reduced-motion; con reduced-motion no se anima nada. Las ventanas se encienden una vez al cargar si está abierto (opacidad, 0.6s, escalonado 0.12s). Los títulos de sección suben por líneas dentro de una máscara (0.9s, `power4.out`). Los platos entran escalonados (30px, 40ms). Las fotos se revelan al entrar y hacen un zoom lento ligado al scroll (1.12 → 1, luego hasta 1.08). La cabecera se esconde al bajar. Lenis solo con puntero fino. Solo se animan las propiedades que permite la constitución II.

## Do's and Don'ts

### Do:
- **Do** usar los roles de color (`var(--frailejon)`), nunca un hex en un componente.
- **Do** añadir a `tokens.test.ts` cualquier par texto/fondo nuevo antes de usarlo.
- **Do** dibujar la ilustración plana, con cada relleno tomado de un token.
- **Do** poner toda la voz display en Sofia Sans Extra Condensed 800 en mayúsculas, alineada a la izquierda.
- **Do** mantener las esquinas rectas (0) en toda superficie de UI.
- **Do** ordenar los bloques de color de claro a oscuro, con texto noche hasta el kraft y pergamino desde el tostado.
- **Do** dar a todo lo que depende de JS un respaldo sin JS (el pie para el panel, la placa oculta sin estado).

### Don't:
- **Don't** usar degradados ni brillos en la ilustración ni en la UI.
- **Don't** añadir sombras fuera de la elevación de la tarjeta de producto con ratón.
- **Don't** poner texto en `linea`, `monte`, `muro`, `teja` ni `apagado`.
- **Don't** añadir un tema claro ni un conmutador de tema.
- **Don't** usar otra familia o peso display que la condensada 800.
