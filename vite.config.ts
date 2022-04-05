import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  server: {
    port: 81,
    proxy: {
      "/api": {
        // target: "http://localhost:5000/",
        target: "http://120.53.125.13:5000/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: "@import './src/assets/styles/index.less';"
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@V": path.resolve(__dirname, "src/views"),
      "@C": path.resolve(__dirname, "src/components"),
    },
  },
});
