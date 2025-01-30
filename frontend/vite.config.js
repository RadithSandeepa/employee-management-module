import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8800', // backend URL
        changeOrigin: true,
        secure: false, // Set to false if using HTTP
      },
    },
  },
  plugins: [react(), tailwindcss(),],
})
