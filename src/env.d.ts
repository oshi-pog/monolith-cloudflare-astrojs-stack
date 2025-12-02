/// <reference types="astro/client" />

/**
 * Cloudflare Worker Environment Bindings
 *
 * Required:
 * - DB: D1 Database for user data and sessions
 * - BETTER_AUTH_SECRET: Secret key for Better Auth sessions
 *
 * Optional (uncomment in wrangler.jsonc to enable):
 * - KV: Key-Value storage
 * - BUCKET: R2 object storage
 * - COUNTER: Durable Object example
 *
 * OAuth (optional, for social login):
 * - GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET
 */
export interface Env {
    // Required
    DB: D1Database;
    BETTER_AUTH_SECRET: string;

    // OAuth providers (optional - add credentials to enable)
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;

    // Optional bindings (uncomment in wrangler.jsonc to enable)
    // KV: KVNamespace;
    // BUCKET: R2Bucket;
    // COUNTER: DurableObjectNamespace;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
    interface Locals extends Runtime {}
}
