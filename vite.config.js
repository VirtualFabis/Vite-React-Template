import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import { TanStackRouterVite as tanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '');

  console.log('👾 -----------------------------------------------------------👾');
  console.log('👾 => file: vite.config.js:8 => defineConfig => mode:', mode);
  console.log('👾 -----------------------------------------------------------👾');

  console.log('👾 ----------------------------------------------------------👾');
  console.log('👾 => file: vite.config.js:13 => defineConfig => env:', environment.BASE_API_URL);
  console.log('👾 ----------------------------------------------------------👾');

  return {
    plugins: [react(), tanStackRouterVite()],
    base: environment.VITE_BASE_APP_URL,
    server: {
      host: true,
    },
    build: {
      outDir: 'build',
      emptyOutDir: 0,
      chunkSizeWarningLimit: 3000,
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, './src'),
        },
        {
          find: '@assets',
          replacement: path.resolve(__dirname, './src/assets'),
        },
        {
          find: '@components',
          replacement: path.resolve(__dirname, './src/components'),
        },
        {
          find: '@services',
          replacement: path.resolve(__dirname, './src/services'),
        },
        {
          find: '@hooks',
          replacement: path.resolve(__dirname, './src/hooks'),
        },
        {
          find: '@utils',
          replacement: path.resolve(__dirname, './src/utils'),
        },
        {
          find: '@routes',
          replacement: path.resolve(__dirname, './src/routes'),
        },
        {
          find: '@theme',
          replacement: path.resolve(__dirname, './src/theme'),
        },
      ],
    },
  };
});
