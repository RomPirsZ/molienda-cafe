# Spec 001 — Sitio de Molienda (café de especialidad ficticio)

> Qué se construye y por qué. Los detalles técnicos están en `plan.md`. Rige `docs/constitution.md`.
> Proyecto 001 del portafolio [A]nkordev (spec 001 §8 del portafolio, tarea T27).
> Estado: **aprobada** (2026-11-03)

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
- Solo `transform` y `opacity`. Con `prefers-reduced-motion` no hay ninguna animación, y sin JS todo se ve en su sitio.

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
