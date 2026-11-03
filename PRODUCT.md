# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 + Tailwind CSS 4, salida estática; GSAP + Lenis para el movimiento. Mismas versiones fijadas que el portafolio [A]nkordev; sin React, three ni adaptador de Vercel. Decidido en el plan aprobado el 2026-11-03.

## Users

- **Visitantes del portafolio de [A]nkordev** (público real): dueños de negocios locales en Venezuela y clientes internacionales que abren este sitio desde el caso de estudio 001 para juzgar si [A]nkordev sabe hacer la web de un café o restaurante. Llegan sobre todo desde el teléfono.
- **Cliente del café dentro de la ficción** (público simulado): alguien en Mérida, con el móvil, que quiere saber qué se sirve, cuánto cuesta, cuándo abre y dónde está, y hacerse una idea del ambiente antes de ir.

El sitio tiene que funcionar de verdad para el segundo público: así es como convence al primero.

## Product Purpose

**Molienda** es un café de especialidad **ficticio** en Mérida (Venezuela), junto a las fincas cafetaleras andinas. Su web es el proyecto 001 del portafolio de [A]nkordev (spec 001 §8 del portafolio): demuestra cómo se resuelve la web de un negocio local de comida, con buen gusto, rapidez en el móvil y accesibilidad.

**Éxito:** un dueño de café o restaurante que lo vea piensa «quiero algo así para mi negocio», y un cliente técnico encuentra en el caso de estudio decisiones bien justificadas.

## Positioning

El grano viene de las fincas de los Andes venezolanos, a pocos kilómetros de la barra, y se muele al momento. Ese origen es lo que lo distingue de un café de especialidad genérico, y es lo que debe sentirse en el contenido.

## Operating Context

- Visitas desde el teléfono, a menudo con datos móviles limitados; también escritorio (clientes internacionales que evalúan).
- Una sola página: carta, origen del grano, ambiente, horario y ubicación.
- Se llega desde el enlace «Ver sitio» del caso de estudio 001 en el portafolio.

## Capabilities and Constraints

- **Oferta:** café de especialidad (métodos y espresso), panadería y brunch.
- **Sin funciones comerciales reales:** no hay pedidos, carrito, reservas, pagos, formularios que recojan datos, WhatsApp ni teléfono reales. El portafolio está en Vercel Hobby, que no admite uso comercial.
- **Precios de la carta ficticios** y marcados como tales.
- **Dirección y horario ficticios:** solo texto, sin mapa embebido ni dirección que pueda coincidir con un local real.
- **Solo en español.**
- **Sin despliegue por ahora:** en esta fase se trabaja solo la estética, en local.
- Rigen `docs/constitution.md` (copia de la del portafolio) y la spec propia en `docs/specs/001-sitio/`.

## Brand Commitments

- **Nombre:** «Molienda», elegido el 2026-11-03. Es original: no se usa el nombre, el logo ni los textos de la referencia visual.
- **Aviso de concepto visible:** el sitio dice que es un concepto de portafolio de [A]nkordev y que el café no existe. El footer lleva un crédito discreto, «Concepto de [A]nkordev», sin enlaces a servicios ni precios mientras siga en Vercel Hobby.
- **Referencias fijadas por el usuario** (principios, no copia): el shot de Dribbble «Noir Bean Specialty Coffee Café Brand Identity» para lo visual y noovolife.com para el movimiento, sobre todo el revelado de imágenes al hacer scroll.

## Evidence on Hand

- No hay fotos propias, ni clientes, reseñas, cifras, premios ni prensa. **No se inventan reseñas ni valoraciones**, ni siquiera dentro de la ficción.
- Las fotos son de ambientación (stock con licencia libre, con créditos) o ilustraciones propias, y nunca se presentan como trabajo o clientes reales.
- Origen del café: las regiones cafetaleras de los Andes venezolanos (Mérida, Táchira, Trujillo) son reales. Las fincas concretas que se nombren son ficticias y van marcadas como tales.

## Product Principles

1. **Lo que se necesita, primero.** Carta, horario y ubicación se encuentran en segundos desde el teléfono.
2. **El origen como historia.** Cada sección refuerza que el grano viene de los Andes y se trabaja con calma.
3. **Honesto con la ficción.** El concepto se declara: nada de reseñas, cifras ni funciones que finjan ser reales.
4. **El movimiento acompaña, no retrasa.** Las imágenes se revelan al hacer scroll, pero el contenido se lee igual sin JS ni animaciones.

## Accessibility & Inclusion

WCAG 2.2 AA (constitución III): contraste AA, teclado completo, foco visible, HTML semántico, texto alternativo en todas las fotos y cero violaciones serias de axe. Sin animaciones con `prefers-reduced-motion`. Lighthouse móvil ≥ 90 en rendimiento y ≥ 95 en el resto (constitución IV).
