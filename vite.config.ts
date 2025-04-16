import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.obj', '**/*.fbx'],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
})
