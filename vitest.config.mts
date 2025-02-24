import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
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