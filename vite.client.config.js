import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: false,
  build: {
    outDir: 'public/static/ui', emptyOutDir: true,
    rollupOptions: { input: 'src/main.jsx', output: { entryFileNames: 'app.js', chunkFileNames: 'chunks/[name]-[hash].js', assetFileNames: 'assets/[name][extname]' } }
  }, base: '/static/ui/'
})
