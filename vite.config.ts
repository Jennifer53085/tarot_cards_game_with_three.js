import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: "/tarot_cards_game_with_three.js/",//必須使用與repo一樣名稱才可以部署到github pages
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@app': '/src', // 確保這裡是正確的相對路徑
    }
  }
})

//出版的話必須要先build之後才可以deploy
