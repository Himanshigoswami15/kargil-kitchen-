import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Fix: Cast process to any to resolve TypeScript error regarding 'cwd'
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Define process.env.API_KEY globally for the browser environment
      // Fallback to empty string to prevent "process is not defined" error if variable is missing
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
    },
  };
});