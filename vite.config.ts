import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Define process.env.API_KEY globally for the browser environment
      // Fallback to empty string to prevent "process is not defined" error if variable is missing
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
    },
  };
});