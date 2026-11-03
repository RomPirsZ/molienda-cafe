// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Todo estático: no hay servidor ni formularios (spec §7)
  output: 'static',
  // Scripts y estilos siempre como archivos: así una futura CSP solo necesita `self`
  build: { inlineStylesheets: 'never' },
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 0 },
  },
});
