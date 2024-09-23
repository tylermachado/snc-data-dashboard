import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
	preprocess: preprocess({
		scss: {
		// Options for the SCSS compiler
		includePaths: ['src', 'src/styles'],
		},
	}),

	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
      base: process.env.NODE_ENV === 'production' ? '/snc-data-dashboard' : '',
		}
	}
};

export default config;
