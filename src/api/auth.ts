import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { createDb } from "../db";
import * as schema from "../db/schema";
import type { Env } from "../env";

/**
 * Creates a Better Auth instance with Cloudflare runtime bindings.
 * Must be called per-request to ensure fresh env bindings (Cloudflare best practice).
 *
 * @see https://developers.cloudflare.com/workers/runtime-apis/bindings/
 */
export const createAuth = (env: Env) => {
    return betterAuth({
        database: drizzleAdapter(createDb(env.DB), {
            provider: "sqlite",
            schema: schema,
        }),
        emailAndPassword: {
            enabled: true,
        },
        socialProviders: {
            github: {
                clientId: env.GITHUB_CLIENT_ID,
                clientSecret: env.GITHUB_CLIENT_SECRET,
            },
        },
        secret: env.BETTER_AUTH_SECRET,
    });
};
