import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5005,
    proxy: {
      "/api" : {
        target: "https://zerowaste-api:8088",
        changeOrigin: true,
        secure: true,      
        ws: true,
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
