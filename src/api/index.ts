import { Hono } from 'hono';
import { trpcServer } from '@hono/trpc-server';
import { appRouter } from './trpc/router';
import { createContext } from './trpc/context';
import { createAuth } from './auth';
import type { Env } from '../env';

type Bindings = {
    env: Env;
    ctx: ExecutionContext;
};

const app = new Hono<{ Bindings: Bindings }>().basePath('/api');

// Health check
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Mount Better Auth - creates fresh instance per request with Cloudflare env
app.on(['POST', 'GET'], '/auth/**', (c) => {
    const auth = createAuth(c.env.env);
    return auth.handler(c.req.raw);
});

// Mount tRPC - passes env and ctx to createContext
app.use('/trpc/*', async (c, next) => {
    return trpcServer({
        router: appRouter,
        createContext: (opts) => createContext(opts, c.env.env, c.env.ctx),
    })(c, next);
});

export default app;
export type AppType = typeof appRouter;
