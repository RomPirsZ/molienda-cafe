# Spec 001 — Sitio de Molienda (café de especialidad ficticio)

> Qué se construye y por qué. Los detalles técnicos están en `plan.md`. Rige `docs/constitution.md`.
> Proyecto 001 del portafolio [A]nkordev (spec 001 §8 del portafolio, tarea T27).
> Estado: **aprobada** (2026-11-03). **Rediseño oscuro aprobado el 2026-11-17: ver §10, que manda sobre §4, §5, §7 y §8 donde choquen.**

---

## 1. Objetivo

Una página única para **Molienda**, un café de especialidad **ficticio** en Mérida (Venezuela), junto a las fincas cafetaleras de los Andes. Muestra su carta, el origen del grano, el ambiente, el horario y la ubicación.

Es una pieza de portafolio: tiene que funcionar de verdad para el cliente del café (el público simulado), porque así convence a quien evalúa a [A]nkordev (el público real). Ver `PRODUCT.md`.

**Éxito:** desde el teléfono, en menos de 10 segundos se sabe qué se sirve, a qué precio y cuándo abre. Un dueño de negocio que lo ve piensa «quiero algo así».

## 2. Referencias (principios, no copia)

| Referencia | Qué tomamos | Qué no tomamos |
|---|---|---|
| Dribbble, «Noir Bean Specialty Coffee Café Brand Identity» (captura aportada por el usuario el 2026-11-03) | Fondo crema cálido con marrón espresso como tinta y relleno. Serif display de contraste suave en titulares y un logotipo en mayúsculas espaciadas. Etiquetas pequeñas en sans mayúscula espaciada. Carta en lista: miniatura, nombre, una línea de descripción y precio alineado a la derecha. Líneas divisorias finas, iconos de trazo y sellos circulares. Fotografía cálida de cerámica, madera e interior. Botones con esquinas casi rectas: uno relleno oscuro y otro de contorno. | El nombre, el logo y los textos. El carrito y el flujo de pedido móvil (aquí no hay funciones comerciales). Las direcciones de locales. |
| noovolife.com (medido en Chromium el 2026-11-03) | **Revelado de imágenes**: el marco, con esquinas y `overflow: hidden`, sube 50 px hasta su sitio mientras la foto de dentro pasa de escala 1,12 a 1, en unos 1,2–1,4 s con una curva de salida suave (`cubic-bezier(.22, 1, .36, 1)`). Después, la foto crece despacio, ligada al scroll, mientras cruza la pantalla (hasta ~1,12). Las tarjetas de una rejilla entran con opacidad 0→1 y 30 px→0, escalonadas, en 0,8–1,1 s. Los textos cortos suben dentro de una máscara de una línea. La cabecera se oculta al bajar y vuelve al subir. | Su paleta, sus fotos y su estructura de concesionario de furgonetas. Sus modales (newsletter, cookies). |

Todo el movimiento medido en noovolife usa solo `transform` y `opacity`: cabe en la constitución II sin excepciones.

## 3. Historias de usuario

1. **Como cliente del café, con el móvil**, quiero ver la carta con precios para decidir si voy.
2. **Como cliente del café**, quiero saber el horario y la zona sin buscar, para no encontrarlo cerrado.
3. **Como cliente del café**, quiero entender de dónde viene el grano y cómo es el sitio, para saber si es mi tipo de café.
4. **Como dueño de un negocio que evalúa a [A]nkordev**, quiero ver una web de café que se sienta cuidada y rápida, y saber que es un concepto, para imaginar la mía.
5. **Como visitante con movimiento reducido o sin JavaScript**, quiero leer todo igual.

## 4. Página (una sola, en español)

1. **Cabecera:** logotipo «Molienda» y enlaces a Carta, Origen y Visítanos. Se oculta al bajar y vuelve al subir. En el móvil, menú accesible.
2. **Hero:** titular, una frase sobre el origen andino, foto principal y acceso directo a la carta. Incluye un aviso discreto de concepto.
3. **Carta:** café (espresso y métodos), panadería y brunch. Cada plato lleva nombre, una línea de descripción y precio. Los precios son ficticios y se rotulan como tales.
4. **Origen:** de la finca a la taza. Las regiones (Mérida, Táchira, Trujillo) son reales; las fincas nombradas son ficticias y lo dicen.
5. **Ambiente:** galería de fotos con el revelado de imágenes.
6. **Visítanos:** horario y zona ficticios, solo en texto, sin mapa embebido, teléfono ni WhatsApp.
7. **Pie:** «Concepto de [A]nkordev — Molienda no existe», con los créditos de las fotos y el año.

*Cambio 2026-11-03 (M05): la carta va justo después del hero y antes del origen. El primer viewport ya la empieza con tres cafés y «Ver la carta» lleva a ella; así, lo que se necesita (PRODUCT.md, principio 1) llega antes que la historia.*

## 5. Identidad visual

**Dirección elegida el 2026-11-03 en la ronda de impeccable: «Cafetería de pueblo».** Es la identidad de una cafetería andina de los noventa:
- Un sol grabado sobre el páramo como sello.
- Papel kraft con bordes rasgados.
- Mayúsculas serif muy espaciadas para los titulares y sans humanista para el texto.
- Tinta espresso, terracota solo para la acción principal, oliva en las franjas de sección y mostaza de frailejón como acento mínimo.
- Esquinas rectas, sin sombras: la profundidad sale del papel superpuesto.

**Cambio 2026-11-03, pedido por el usuario:** cada producto (los platos de la carta y los tres cafés del primer viewport) va en una **tarjeta semirredondeada** de pergamino. Con ratón, la tarjeta se eleva un poco y aparece una sombra debajo. Es la única excepción a «esquinas rectas, sin sombras»: botones, franjas y fotos siguen igual. Solo se animan `transform` (la elevación) y `opacity` (la sombra, en una capa aparte). Con movimiento reducido no hay elevación, pero la sombra sigue señalando el hover.

De la referencia de Dribbble (§2) se mantienen la tinta espresso, la serif, la fotografía cálida y la carta en lista.

El contrato completo está en `.impeccable/surfaces/src-pages-index-astro.md`, y el sistema queda registrado en `DESIGN.md` al terminar la construcción.

**Primer viewport:** cabecera centrada, sello, «MOLIENDA» grande, tira terracota con el lema, aviso de concepto, y tres cafés con precio y procedencia visibles sin hacer scroll, más el estado «Abierto ahora».

## 6. Movimiento

- **Sello que se vuelve a estampar** en la cabecera al entrar en cada sección (escala y opacidad).
- **Revelado de imágenes** como en §2, dentro de marcos de papel rasgado, en el origen y la galería.
- **Estado de apertura en vivo:** «Abierto ahora · cierra a las 7 p. m.», calculado con la hora de Mérida (America/Caracas). Sin JS se ve el horario completo. Los días cerrados aparecen como franjas apagadas, no se omiten.
- Zoom lento ligado al scroll en las fotos grandes.
- Titulares y etiquetas que suben dentro de una máscara de línea.
- Platos de la carta que entran escalonados.
- Cabecera que se oculta y reaparece.
- Scroll suave (Lenis).
- Solo propiedades que no recalculan el diseño (constitución II, 1.3.0: `transform`, `opacity`, `clip-path`, `mask`, filtros, color y sombras). Con `prefers-reduced-motion` no hay ninguna animación, y sin JS todo se ve en su sitio.

## 7. Restricciones

- **Nada comercial real** (PRODUCT.md): sin pedidos, carrito, reservas, pagos, formularios, WhatsApp ni teléfonos. Sin enlaces a los servicios o precios de [A]nkordev mientras el portafolio siga en Vercel Hobby.
- **Honestidad:** sin reseñas, valoraciones, premios ni cifras, ni siquiera ficticias. Lo ficticio se rotula.
- **Fotos:** de ambientación, de stock con licencia libre, alojadas en el propio sitio y con créditos. Nunca se presentan como trabajo o clientes reales.
- **Sin despliegue** en esta fase. Solo local.

## 8. Fuera de alcance

Inglés, varias páginas, carrito o pedidos, reservas, mapa, blog, CMS, despliegue y dominio.

## 9. Criterios de aceptación

- [ ] Todo el contenido se lee sin JavaScript.
- [ ] Con movimiento reducido no hay animaciones.
- [ ] Teclado completo, foco visible y cero violaciones serias o críticas de axe en móvil y escritorio.
- [ ] Contraste AA en todos los textos, también sobre las fotos.
- [ ] Lighthouse móvil ≥ 90 en rendimiento y ≥ 95 en accesibilidad, buenas prácticas y SEO (medido en local).
- [ ] El aviso de concepto se ve sin hacer scroll, y los precios ficticios están rotulados.
- [ ] Ninguna petición a terceros: fuentes, fotos y scripts servidos desde el propio sitio.

## 10. Rediseño oscuro (2026-11-17)

Lo pidió el usuario el 2026-11-17, antes de publicar el caso 001 en el portafolio (T30). Sustituye la identidad «Cafetería de pueblo» de §5. Los contenidos se mantienen: carta, origen, ambiente, horario, zona y aviso de concepto.

### 10.1 Referencia (principios, no copia)

| Referencia | Qué tomamos | Qué no tomamos |
|---|---|---|
| Captura aportada por el usuario el 2026-11-17: web de un tostador de café con fachada ilustrada de noche | Fondo oscuro con un hero que es una **escena ilustrada plana de la fachada**. **Titular enorme en mayúsculas condensadas y negrita.** El **estado de apertura** abajo a la izquierda, junto a un botón de acción de color. Un **panel lateral derecho de bloques planos a toda la altura**, cada uno de un color, que hacen de navegación. | El nombre, el logo, la ilustración, los textos, la dirección y su paleta gris y lima. |

### 10.2 Decisiones del usuario (2026-11-17)

1. **Dirección nueva, cerca de la referencia.** Se retiran el papel rasgado y la serif espaciada. El sello puede quedar como detalle menor, o desaparecer si impeccable lo justifica.
2. **Colores oscuros** con los verdes, marrones y beiges de la marca, en buen contraste. **Un solo tema, oscuro.**
3. **Panel lateral:** un botón lo despliega desde la derecha. Sus bloques son Carta, Cafés de origen, Para llevar, Horario y Visítanos, y **cada bloque lleva a su sección** de la página. El contenido no se abre dentro del panel.
4. **Hero con ilustración propia en SVG:** la fachada de una casona andina de Mérida (tejas, portón de madera, ventanas con reja, el páramo detrás), en la paleta oscura.
5. **«Para llevar» como ticket sin envío:** se eligen productos de la carta y se arma un ticket en pantalla para enseñar en la barra. No se envía nada, no se recogen datos y no se guarda nada fuera de la página. Va rotulado como concepto.
6. **Se despliega** (Cloudflare Workers, como la tienda) para que el caso 001 tenga enlace real.

### 10.3 Página

1. **Cabecera:** logotipo «Molienda» y el botón que abre el panel. Sin JS, el botón es un enlace a una navegación normal al pie de la página.
2. **Hero:** ilustración de la fachada, titular grande, estado de apertura en vivo con el botón «Ver la carta», y aviso de concepto visible sin scroll.
3. **Panel lateral** (§10.2, punto 3).
4. **Carta:** los mismos platos, precios ficticios rotulados.
5. **Cafés de origen:** antes «Origen».
6. **Para llevar** (§10.2, punto 5). Sin JS, explica que el pedido se hace en la barra.
7. **Ambiente:** la galería.
8. **Visítanos:** horario y zona ficticios, solo texto.
9. **Pie:** «Concepto de [A]nkordev — Molienda no existe», créditos y año. El crédito puede enlazar al portafolio, porque el hosting ya no es Vercel Hobby.

### 10.4 Cambios en las restricciones (§7 y §8)

- **Pedidos:** se permite solo el ticket de demostración de §10.2, punto 5. Siguen fuera los pedidos reales: envío, pago, WhatsApp, teléfono, formularios que recojan datos y reservas.
- **Despliegue:** deja de estar fuera de alcance. El dominio propio sigue fuera.

### 10.5 Criterios de aceptación añadidos

- [ ] El panel se abre y se cierra con teclado, se cierra con Esc y devuelve el foco al botón. Sin JS, la navegación del pie está disponible.
- [ ] Contraste AA en cada bloque del panel y en el texto sobre la ilustración.
- [ ] El ticket suma bien (con tests unitarios), se puede vaciar y no hace ninguna petición de red.
- [ ] El sitio responde en su URL pública con las cabeceras de seguridad del portafolio (CSP solo `self`).
