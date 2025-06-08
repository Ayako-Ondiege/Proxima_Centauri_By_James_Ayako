import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // allows cleaner imports like @/components/MyComponent
    },
  },
  server: {
    port: 5173,             // You can change this if needed
    open: true,             // Automatically opens browser on dev server start
    strictPort: true,       // Fail if port is already in use
    cors: true,             // Enables CORS (in case frontend calls a separate backend)
  },
  build: {
    outDir: 'dist',
    sourcemap: true,        // Enable sourcemaps for debugging in production
    assetsInlineLimit: 8192 // Inline files < 8kb (helps with small icons, SVGs, etc.)
  },
  envPrefix: 'VITE_',        // Only expose env vars starting with VITE_ to the client
});