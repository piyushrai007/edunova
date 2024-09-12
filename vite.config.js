import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    
    VitePWA({
      registerType: 'prompt', // Automatically update the service worker
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'], // Include these assets in the build
      manifest: {
        name: 'Edunova', // Full name of your app
        short_name: 'Edu', // Short name, usually a shorter version of the app name
        description: 'eduction platform with ai integration', // Brief description of your app
        theme_color: '#ffffff', // Theme color for the PWA
        background_color: '#ffffff', // Background color for the PWA splash screen
        display: 'standalone', // Makes the app appear as a standalone app
        icons: [
          {
            src: 'pwa-192x192.png', // Path to 192x192 icon
            sizes: '192x192', // Size of the icon
            type: 'image/png', // MIME type of the icon
          },
          {
            src: 'pwa-512x512.png', // Path to 512x512 icon
            sizes: '512x512', // Size of the icon
            type: 'image/png', // MIME type of the icon
          }
        ]
      }
    })
  ],
  
});
