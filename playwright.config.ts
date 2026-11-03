import { defineConfig, devices } from '@playwright/test';

// Puerto propio, distinto del de `astro dev` (4321) y del de los e2e del portafolio
// (4329): con reuseExistingServer, compartir puerto haría probar el sitio equivocado.
const PORT = 4339;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
  ],
  // Se prueba el build real, no el servidor de desarrollo
  webServer: {
    command: `npm run build && npx astro preview --ignore-lock --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
