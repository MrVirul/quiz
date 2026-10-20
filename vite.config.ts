import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'request-logger',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          console.log(`${req.method} ${req.url}`);
          next();
        });
      },
    },
  ],
});
