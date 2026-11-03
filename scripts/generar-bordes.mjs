// Genera los bordes de papel rasgado (plan §5): SVG estáticos y tileables en horizontal
// (el borde empieza y acaba a la misma altura), usados como máscara. Cada borde trae su
// «fibra»: el canto claro del papel, un poco más alto y más irregular, que asoma por
// encima del color. Semilla fija: el resultado es siempre el mismo.
// Uso: node scripts/generar-bordes.mjs
import { writeFileSync } from 'node:fs';

const ANCHO = 1200;
const ALTO = 28;

function aleatorio(semilla) {
  let s = semilla >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
}

/** Línea rasgada: ondas largas (periodos que dividen el ancho, para que case al repetir) + dientes cortos. */
function linea(semilla, base, amplitud, dientes, semillaDientes = semilla) {
  // Las ondas salen de `semilla`; los dientes, de `semillaDientes`: la fibra comparte
  // la forma del borde y solo cambia el canto.
  const ondas = aleatorio(semilla);
  const fases = [ondas(), ondas(), ondas()].map((f) => f * Math.PI * 2);
  const r = aleatorio(semillaDientes);
  const puntos = [];
  for (let x = 0; x < ANCHO; x += 3 + r() * 7) {
    const onda =
      Math.sin((x / ANCHO) * Math.PI * 2 * 2 + fases[0]) * amplitud * 0.5 +
      Math.sin((x / ANCHO) * Math.PI * 2 * 5 + fases[1]) * amplitud * 0.3 +
      Math.sin((x / ANCHO) * Math.PI * 2 * 11 + fases[2]) * amplitud * 0.2;
    const diente = (r() - 0.5) * dientes + (r() < 0.04 ? r() * dientes * 1.6 : 0);
    puntos.push([x, base + onda + diente]);
  }
  // Cierre exacto: el último punto coincide con el primero desplazado un ancho
  puntos.push([ANCHO, puntos[0][1]]);
  return puntos.map(([x, y]) => [Math.round(x * 10) / 10, Math.round(Math.min(ALTO - 1, Math.max(1, y)) * 10) / 10]);
}

function svg(puntos) {
  const d = `M0 ${ALTO} L${puntos.map(([x, y]) => `${x} ${y}`).join(' L')} L${ANCHO} ${ALTO} Z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ANCHO} ${ALTO}" preserveAspectRatio="none"><path d="${d}"/></svg>\n`;
}

for (const [n, semilla] of [[1, 7], [2, 23]]) {
  writeFileSync(new URL(`../src/assets/marcas/borde-${n}.svg`, import.meta.url), svg(linea(semilla, 16, 6, 3.2)));
  writeFileSync(new URL(`../src/assets/marcas/borde-${n}-fibra.svg`, import.meta.url), svg(linea(semilla, 12.5, 6, 4.2, semilla * 31)));
}
console.log('bordes generados en src/assets/marcas/');

// Cantos de marco (revisión final de impeccable): tiras finas para los cuatro lados de
// un marco o un botón, combinadas como máscara (Foto.astro, .boton-accion). Cada tira es
// opaca hacia dentro y rasgada hacia fuera. Más finas y con dientes más pequeños que los
// bordes de franja, porque enmarcan piezas pequeñas.
const LARGO = 600;
const GROSOR = 12;

function canto(semilla) {
  const r = aleatorio(semilla);
  const fase = r() * Math.PI * 2;
  const pts = [];
  for (let t = 0; t < LARGO; t += 2 + r() * 5) {
    const onda = Math.sin((t / LARGO) * Math.PI * 2 * 3 + fase) * 1.2;
    pts.push([t, 5 + onda + (r() - 0.5) * 3.4 + (r() < 0.05 ? r() * 2.5 : 0)]);
  }
  // La tira empieza en la esquina: un primer diente alto se ve como un «poste». Se
  // hunde el arranque (y el cierre, que es el mismo punto al repetir): esquina rasgada.
  pts[0][1] = GROSOR - 3;
  if (pts[1]) pts[1][1] = Math.max(pts[1][1], GROSOR - 5);
  pts.push([LARGO, pts[0][1]]);
  return pts.map(([t, d]) => [Math.round(t * 10) / 10, Math.round(Math.min(GROSOR - 1, Math.max(0.5, d)) * 10) / 10]);
}

/** lado: por dónde queda el canto rasgado (arriba, abajo, izquierda o derecha). */
function svgCanto(pts, lado) {
  const horizontal = lado === 'arriba' || lado === 'abajo';
  const [w, h] = horizontal ? [LARGO, GROSOR] : [GROSOR, LARGO];
  const xy = ([t, d]) => {
    if (lado === 'arriba') return `${t} ${d}`;
    if (lado === 'abajo') return `${t} ${GROSOR - d}`;
    if (lado === 'izquierda') return `${d} ${t}`;
    return `${GROSOR - d} ${t}`;
  };
  const cierre = { arriba: `L${LARGO} ${GROSOR} L0 ${GROSOR} Z`, abajo: `L${LARGO} 0 L0 0 Z`, izquierda: `L${GROSOR} ${LARGO} L${GROSOR} 0 Z`, derecha: `L0 ${LARGO} L0 0 Z` }[lado];
  const d = `M${pts.map(xy).join(' L')} ${cierre}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="${d}"/></svg>\n`;
}

for (const [lado, semilla] of [['arriba', 101], ['abajo', 103], ['izquierda', 107], ['derecha', 109]]) {
  writeFileSync(new URL(`../src/assets/marcas/canto-${lado}.svg`, import.meta.url), svgCanto(canto(semilla), lado));
}
console.log('cantos de marco generados');
