import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5005,
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
