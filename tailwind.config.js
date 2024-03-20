/** @type {import('tailwindcss').Config} */
export default {
  content: ['src/**/*.ts'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', '-apple-system', 'sans-serif'],
        mono: ['Menlo', 'Consolas', 'monospace']
      }
    }
  },
  plugins: []
};
