import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      port: 4173,
      proxy: {
        '/api/google': {
          target: 'https://generativelanguage.googleapis.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/google/, ''),
          headers: {
            'X-goog-api-key': env.VITE_GOOGLE_API_KEY || '',
          },
        },
      },
    },
  };
});
