import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    build: {
      outDir: 'dist'
    },
    define: {
      // Explicitly replace process.env.API_KEY with the value
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Define process.env as an empty object to prevent "process is not defined" errors
      'process.env': {}
    }
  }
})