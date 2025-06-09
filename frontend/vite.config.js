import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Cleaner imports like @/components/...
    },
  },
  server: {
    port: 5173,
    open: true,
    strictPort: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // ✅ Flask backend base URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // preserves /api prefix
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    assetsInlineLimit: 8192,
  },
  envPrefix: 'VITE_',
});