import { VitePWA } from 'vite-plugin-pwa'

export default {
  server: {
    host: true,
    port: 8080
  },
  plugins: [
    VitePWA({
      filename: 'sw.js'
    })
  ]
}