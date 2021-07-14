import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import sveltePreprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

export default {
    preprocess: [
        sveltePreprocess({
            postcss: true,
            defaults: {
                style: 'postcss',
            },
        }),
        mdsvex(mdsvexConfig),
    ],
    extensions: ['.svelte', ...mdsvexConfig.extensions],
    kit: {
        adapter: adapter(),
        target: '#svelte',
        files: {
            assets: 'static',
            hooks: 'src/hooks',
            lib: 'src/lib',
            routes: 'src/routes',
            serviceWorker: 'src/service-worker',
            template: 'src/app.html',
        },
    },
}
