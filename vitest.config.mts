import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import visualizer from 'rollup-plugin-visualizer'; // Correct import

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Open the bundle report in the browser after build
      filename: 'bundle-report.html', // Output file
      gzipSize: true, // Show gzip sizes
      brotliSize: true, // Show brotli sizes
    }),
  ],
  test: {
    globals: true, //  Enable global `expect`
    environment: 'jsdom', // Use jsdom for DOM testing
    setupFiles: './src/__tests__/setupTests.ts', //  Load Jest matchers
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
      '@': path.resolve(__dirname, 'src'),
      '$': path.resolve(__dirname, 'src/components'),
    },
  },
});