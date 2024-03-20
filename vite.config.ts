import {defineConfig} from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: ['src/vt-playground.ts'],
      formats: ['es']
    }
  },
  plugins: [cssInjectedByJsPlugin()]
});
