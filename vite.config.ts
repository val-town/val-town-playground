import {defineConfig} from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/vt-playground.ts',
      formats: ['es']
    }
  },
  plugins: [cssInjectedByJsPlugin()]
});
