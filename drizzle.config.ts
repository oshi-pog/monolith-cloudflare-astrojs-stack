import { defineConfig } from "drizzle-kit";

/**
 * Drizzle Kit configuration for Cloudflare D1
 *
 * Required environment variables:
 * - CLOUDFLARE_ACCOUNT_ID: Your Cloudflare account ID (find it in dashboard URL)
 * - CLOUDFLARE_DATABASE_ID: Your D1 database ID (from wrangler d1 create output)
 * - CLOUDFLARE_D1_TOKEN: API token with D1 edit permissions
 *
 * Create a .env file or set these in your shell before running drizzle-kit commands.
 *
 * @see https://orm.drizzle.team/docs/guides/d1-http-with-drizzle-kit
 */
export default defineConfig({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "sqlite",
    driver: "d1-http",
    dbCredentials: {
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
        databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
        token: process.env.CLOUDFLARE_D1_TOKEN!,
    },
});
