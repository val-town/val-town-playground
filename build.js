import esbuild from 'esbuild';
import { litCssPlugin } from 'esbuild-plugin-lit-css';

await esbuild.build({
    entryPoints: ['src/vt-playground.ts'],
    outdir: 'dist',
    minify: true,
    bundle: true,
    plugins: [
        litCssPlugin(),
    ],
});

