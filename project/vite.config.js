import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jwt-decode'],
    exclude: ['lucide-react'],
  },
  commonjsOptions: {
    transformMixedEsModules: true,
  },
  ssr: {
    noExternal: ['jwt-decode'],
  },
});
