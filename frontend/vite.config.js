import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Vite dev server port
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Correct backend server address 
      },
      '/uploads': {
        target: 'http://localhost:5000',  // Correct backend server address 
      },
    },
  },
});

