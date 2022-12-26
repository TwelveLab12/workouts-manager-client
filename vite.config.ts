import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      react(),
      svgr(),
    ],
    server: {
      watch: {
        usePolling: true,
      },
      host: true
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./assets/global";`
        }
      }
    },
  };
});

