
import { defineConfig, UserConfig } from 'vite';
import { UserConfig as VitestUserConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Combine Vite and Vitest configurations
interface VitestConfigExport extends UserConfig {
  test: VitestUserConfig['test'];
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
} as VitestConfigExport);
