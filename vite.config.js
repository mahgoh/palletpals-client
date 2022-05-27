import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { gitDescribeSync } from 'git-describe'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/test/**/*.{js,jsx}', 'src/utils/test-utils.jsx'],
      skipFull: true,
      reporter: ['text'],
    },
  },
  define: {
    GLOBAL: {
      APP_VERSION: gitDescribeSync().semverString,
      API_URL: process.env.API_URL,
      DEBUG: process.env.hasOwnProperty('DEBUG')
        ? process.env.DEBUG === 'true'
        : process.env.NODE_ENV !== 'production',
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
