import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

const dungeonServiceUrl = process.env.DUNGEON_SERVICE_URL;
const playerServiceUrl = process.env.PLAYER_SERVICE_URL;
const fightServiceUrl = process.env.FIGHT_SERVICE_URL;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/dungeon': {
        target: `${dungeonServiceUrl}/api`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/dungeon/, '')
      },
      '/api/player': {
        target: `${playerServiceUrl}/api`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/player/, '')
      },
      '/api/fight': {
        target: `${fightServiceUrl}/api`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/fight/, '')
      }
    }
  }
})
