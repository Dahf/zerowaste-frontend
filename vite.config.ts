import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 5005,
    proxy: {
      '/api': {
        target: 'http://zerowaste-api:8088', // Die URL von Traefik, die auf das Backend weiterleitet
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  server: {
    host: true,
    port: 5005,
    proxy: {
      '/api': {
        target: 'http://zerowaste-api:8088', // Die URL von Traefik, die auf das Backend weiterleitet
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    watch: {
      usePolling: true,
    },
  },
  base: 'https://silasbeckmann.de',
  build: {
    rollupOptions: {
      
      input: {
        main: resolve(__dirname, 'index.html'),

      },
    },
  },
})
