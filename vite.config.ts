import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/tarot_cards/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@app': '/src', // 確保這裡是正確的相對路徑
    }
  }
})
