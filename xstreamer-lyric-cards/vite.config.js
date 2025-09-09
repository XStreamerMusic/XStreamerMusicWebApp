import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // required to accept external connections
    port: 5173,
    allowedHosts: [
      '.ngrok-free.app', // wildcard domains allowed
      'localhost',
      '127.0.0.1',
    ],
  },
})
