/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Set the test environment to jsdom for React
    globals: true, // Optionally enable global test functions like `describe`, `it`, `expect`
    setupFiles: './testSetup.js', // Path to setup tests (optional)
    css: true, // Enable CSS support for Vitest
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    }
  }
});
