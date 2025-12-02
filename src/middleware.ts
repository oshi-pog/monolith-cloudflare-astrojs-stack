import { defineMiddleware } from 'astro:middleware';
import api from './api';

export const onRequest = defineMiddleware(async (context, next) => {
    if (context.url.pathname.startsWith('/api')) {
        // Pass Cloudflare env and ctx to Hono via the bindings object
        // Hono expects bindings as the second argument to fetch()
        const { env, ctx } = context.locals.runtime;
        return api.fetch(context.request, { env, ctx });
    }
    return next();
});
