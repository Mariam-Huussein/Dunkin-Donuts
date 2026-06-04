import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/Dunkin-Donuts/" : "/",
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom", "react-redux", "@reduxjs/toolkit"],
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore"],
          ui: ["bootstrap", "react-bootstrap", "@mui/material"],
          icons: ["lucide-react", "react-icons", "react-bootstrap-icons"],
        },
      },
    },
  },
  plugins: [react()],
}))
