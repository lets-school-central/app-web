import adapter from '@sveltejs/adapter-node';
import {vitePreprocess} from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
        alias: {
            $components: "src/lib/components",
            "$components/*": "src/lib/components/*"
        },
        csp: {
            mode: 'auto',
        },
        csrf: {
            checkOrigin: true,
        },
        version: {
            name: process.env.VERSION
        }
    }
};

export default config;
