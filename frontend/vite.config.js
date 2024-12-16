import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "./src/style.css";` // Adjust path accordingly
      },
    },
  },
  server: {
    port: 3000,  // Set the port to 3000
  },
});
