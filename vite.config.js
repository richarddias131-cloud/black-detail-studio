import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Duas páginas: o site (index.html) e a página de links para Instagram/Google (bio.html)
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        bio: resolve(import.meta.dirname, 'bio.html'),
      },
    },
  },
})
