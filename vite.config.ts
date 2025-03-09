import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host: "localhost",
    port: 5173,
    proxy:{
      "/api":"http://localhost:8000"
    }
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define:{
    global:{},
  }
})
