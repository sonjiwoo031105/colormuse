import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      "/api/colormind": {
        target: "http://colormind.io",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/colormind/, "/api/"),
      }
    }
  }
})
