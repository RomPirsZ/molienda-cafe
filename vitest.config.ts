/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    passWithNoTests: true,
    // tokens.test.ts lee global.css con ?raw: sin esto Vitest entrega el CSS vacío
    css: { include: [/global\.css/] },
  },
});
