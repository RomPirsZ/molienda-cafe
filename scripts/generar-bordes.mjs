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
