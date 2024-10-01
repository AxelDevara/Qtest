import adapter from '@sveltejs/adapter-node';
import path from 'path';
import { vitePreprocess } from '@sveltejs/kit/vite';


/** @type {import('@sveltejs/kit').Config} */

const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
    alias: {
      '@pages': path.resolve('./src/pages'),
      '@comp': path.resolve('./src/components'),
      '@lib': path.resolve('./src/lib'),
    },
  },
};

export default config;
