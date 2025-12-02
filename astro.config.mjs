import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    // TODO: Replace with your production URL before deploying
    site: 'https://example.com',
    output: 'server',
    adapter: cloudflare({
        platformProxy: {
            enabled: true,
        },
    }),
    integrations: [
        react(),
        sitemap({
            // Sitemap will be generated at /sitemap-index.xml
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date(),
        }),
    ],
    vite: {
        plugins: [tailwindcss()],
        ssr: {
            external: ['node:async_hooks'],
        },
    },
});
