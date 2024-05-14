import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5005,
    proxy: {
      "/api" : {
        target: "https://api.silasbeckmann.de/",
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
})
