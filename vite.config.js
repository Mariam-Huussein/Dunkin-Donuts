import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/Dunkin-Donuts/" : "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore"],
          bootstrap: ["bootstrap"],
        },
      },
    },
  },
  plugins: [react()],
}))
