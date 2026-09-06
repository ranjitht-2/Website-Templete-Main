import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, '../../../frontend/public/templates/construction/construction-9'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: true,
    strictPort: true
  }
});
