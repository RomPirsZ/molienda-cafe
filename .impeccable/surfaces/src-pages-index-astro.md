---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Inicio de Molienda (página única)

- **Modo:** Persuade. Visitante: cliente del café en el móvil (simulado) y quien evalúa a [A]nkordev (real). Acción: llegar a la carta, saber si está abierto y armar un pedido para llevar.
- **Contenido:** carta con precios ficticios rotulados, procedencia por café, ticket «Para llevar» sin envío, horario y zona ficticios, aviso de concepto. Sin reseñas ni cifras.
- **Restricciones:** constitución (II 1.3.0: nada que recalcule el diseño; contenido visible sin JS; AA; reduced-motion = nada se mueve); spec §10; un solo tema oscuro; CSP solo `self`.
- **Momento memorable:** la fachada dice la verdad: con el café cerrado, las ventanas se apagan y la placa de la puerta dice cuándo abre.
- **Pendiente:** ninguno de producto; el dibujo exacto de la casona se resuelve en M12.

## Direction contract

THESIS: La página es la fachada de Molienda al anochecer: una casona merideña cuya pizarra del ventanal lleva los cafés del día con precio (HTML real) y cuya placa de la puerta dice en vivo si está abierto. Rechaza el hero partido «titular + foto de taza» y la fila de tarjetas iguales.

OWN-WORLD: suelo de noche andina, espresso casi negro y cálido; muros de tierra oscura, tejas en marrón tostado, ventanas con luz beige plana, la montaña en verde oliva profundo; ilustración plana, sin degradados ni brillos. Panel derecho de bloques planos a toda la altura, de claro a oscuro: pergamino, verde frailejón, caramelo kraft, marrón tostado, espresso. Titulares en Sofia Sans Extra Condensed negra en mayúsculas; texto en Sofia Sans. Esquinas rectas, sin sombras salvo la elevación del producto al pasar el ratón.

STORY: el visitante ve un café de Mérida, abierto o con su hora de apertura, lee tres cafés con precio en la pizarra, cree que está hecho con oficio y pulsa «Ver la carta» o abre «Secciones».

FIRST VIEWPORT: cabecera mínima, «MOLIENDA» a la izquierda y el botón «Secciones» a la derecha. «LA FINCA QUEDA AQUÍ ARRIBA» enorme, en dos líneas, arriba a la izquierda sobre el cielo nocturno y la montaña. Debajo, la casona a todo el ancho: una pizarra de acera (caballete HTML) delante de la ventana derecha con tres cafés y precio, porque dentro del ventanal no se leería en el móvil; placa de la puerta con el estado en vivo y, cerrado, cuándo abre. Abajo a la izquierda, el estado y la zona con «Ver la carta» en un bloque verde frailejón; aviso de concepto visible. En el móvil, la casona se recorta en puerta y ventanal.

FORM: dirección fijada por el usuario (spec §10.1, captura del 2026-11-17) sobre la tirada; la tirada se registró como provocación y no cambia la dirección. seed:7b4decf330f66d24. Interacción firma: el panel entra desde la derecha como cajón de scroll-snap (el dedo lo arrastra; el fondo se oscurece ligado al desplazamiento). Movimiento: las ventanas se encienden una vez al cargar (opacidad); se conserva el de M07 (títulos por líneas enmascaradas, platos escalonados, revelado y zoom lento de las fotos, cabecera que se oculta al bajar).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
