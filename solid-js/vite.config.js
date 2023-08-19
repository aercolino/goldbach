import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
  plugins: [
    solidPlugin({
      dev: true
    }),
    eslintPlugin(),
    svgLoader({
      defaultImport: 'raw'
    })
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
