import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 600
  },
  plugins: [
    react()
  ],
})
