import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  build: {
    outDir: './build',
  },
  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
  },
});
