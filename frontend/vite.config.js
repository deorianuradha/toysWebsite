import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,// Vite dev server port
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // Correct backend server address 
      },
      '/uploads': {
        target: 'http://localhost:8080',  // Correct backend server address 
      },
    },
  },
});

