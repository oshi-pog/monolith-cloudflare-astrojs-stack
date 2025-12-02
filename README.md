# The Monolith Cloudflare Stack

A batteries-included, production-ready starter template for building full-stack applications on Cloudflare's Edge.

This is a **"Monolith on the Edge"** architecture — one codebase, one deployment, zero network latency between your frontend and backend.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | [Astro](https://astro.build) + [React](https://react.dev) |
| **Backend** | [Hono](https://hono.dev) (mounted inside Astro) |
| **Database** | [Cloudflare D1](https://developers.cloudflare.com/d1) + [Drizzle ORM](https://orm.drizzle.team) |
| **API** | [tRPC](https://trpc.io) with explicit [Zod](https://zod.dev) validation |
| **Auth** | [Better Auth](https://www.better-auth.com) (Email/Password + OAuth) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| **Runtime** | [Cloudflare Workers](https://workers.cloudflare.com) |

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier works)

### 1. Clone & Install

```bash
git clone https://github.com/oshi-pog/monolith-cloudflare-astrojs-stack.git
cd monolith-cloudflare-astrojs-stack
pnpm install
```

### 2. Create D1 Database

```bash
npx wrangler d1 create my-app-db
```

Copy the `database_id` from the output and update `wrangler.jsonc`:

```jsonc
"d1_databases": [
    {
        "binding": "DB",
        "database_name": "my-app-db",
        "database_id": "YOUR_DATABASE_ID_HERE",  // <-- paste here
        "migrations_dir": "drizzle"
    }
]
```

### 3. Set Up Environment Variables

Copy the example file:

```bash
cp .dev.vars.example .dev.vars
```

Edit `.dev.vars`:

```env
BETTER_AUTH_SECRET=generate-a-random-32-char-string-here

# Optional: GitHub OAuth (get from github.com/settings/developers)
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
```

### 4. Run Database Migrations

```bash
# Generate migrations from schema
pnpm db:generate

# Apply migrations locally
npx wrangler d1 migrations apply my-app-db --local
```

### 5. Start Development Server

```bash
pnpm dev
```

Visit **http://localhost:4321**

## Project Structure

```
src/
├── api/                  # Backend (Hono + tRPC)
│   ├── index.ts          # API routes
│   ├── auth.ts           # Better Auth config
│   └── trpc/
│       ├── router.ts     # tRPC procedures
│       └── context.ts    # Request context
├── components/           # React components
│   ├── auth/             # SignIn, SignUp
│   └── ui/               # shadcn/ui components
├── db/
│   ├── schema.ts         # Drizzle schema
│   └── index.ts          # DB client
├── lib/
│   ├── auth-client.ts    # Better Auth client
│   ├── trpc.tsx          # tRPC React client
│   └── utils.ts          # Utilities
├── pages/                # Astro routes
├── styles/
│   └── globals.css       # Tailwind v4 theme config
├── middleware.ts         # API routing
└── env.d.ts              # TypeScript types
```

## Why Explicit Zod (Not drizzle-zod)

This template uses **explicit Zod schemas** for tRPC input validation instead of `drizzle-zod`:

```typescript
// src/api/trpc/router.ts
import { z } from 'zod';

export const appRouter = router({
    createUser: publicProcedure
        .input(z.object({
            name: z.string().min(1).max(100),
            email: z.string().email(),
            age: z.number().int().positive().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
            // input is fully typed and validated
        }),
});
```

**Why not drizzle-zod?**

1. **Separation of concerns** — Database schema and API validation have different requirements. Your database might allow `NULL` but your API should require a value.

2. **Explicit is better** — You see exactly what's validated at the API boundary. No magic, no surprises.

3. **Flexibility** — API validation often needs transformations, custom error messages, or refinements that don't map to database constraints.

4. **Fewer dependencies** — One less package to maintain and keep updated.

5. **Type inference** — tRPC + Zod gives you perfect end-to-end type inference without any code generation.

## Adding tRPC Procedures

Define procedures in `src/api/trpc/router.ts`:

```typescript
import { z } from 'zod';

// Define your input schemas explicitly
const createPostInput = z.object({
    title: z.string().min(1).max(200),
    content: z.string().min(1),
    published: z.boolean().default(false),
});

export const appRouter = router({
    // Query with validation
    getUser: publicProcedure
        .input(z.object({ id: z.string().uuid() }))
        .query(async ({ input, ctx }) => {
            return ctx.db.query.user.findFirst({
                where: eq(user.id, input.id)
            });
        }),

    // Mutation with validation
    createPost: publicProcedure
        .input(createPostInput)
        .mutation(async ({ input, ctx }) => {
            // input is typed as { title: string, content: string, published: boolean }
        }),
});
```

Use in React with full type safety:

```tsx
import { trpc } from '@/lib/trpc';

function UserProfile({ userId }: { userId: string }) {
    const { data: user } = trpc.getUser.useQuery({ id: userId });
    return <p>{user?.name}</p>;
}
```

## Deployment

### 1. Set Production Secrets

```bash
wrangler secret put BETTER_AUTH_SECRET
wrangler secret put GITHUB_CLIENT_ID      # if using GitHub OAuth
wrangler secret put GITHUB_CLIENT_SECRET  # if using GitHub OAuth
```

### 2. Apply Migrations to Production

```bash
npx wrangler d1 migrations apply my-app-db --remote
```

### 3. Deploy

```bash
pnpm build && pnpm deploy
```

## Drizzle Kit Commands

For running Drizzle Kit commands (generate, migrate, studio), set these environment variables:

```bash
export CLOUDFLARE_ACCOUNT_ID=your-account-id
export CLOUDFLARE_DATABASE_ID=your-database-id
export CLOUDFLARE_D1_TOKEN=your-api-token

pnpm db:generate
pnpm db:migrate
```

## Optional Cloudflare Bindings

The template supports additional Cloudflare services. Uncomment in `wrangler.jsonc` to enable:

- **KV Namespace**: Key-value storage for caching
- **R2 Bucket**: Object storage for files
- **Durable Objects**: Stateful edge compute

## AI-Assisted Development with MCP

This template was built using AI assistance with **Model Context Protocol (MCP)** servers for documentation lookup. You can use the same approach:

### Recommended MCP Servers

| MCP Server | Purpose |
|------------|---------|
| [Context7](https://github.com/upstash/context7) | Up-to-date documentation for any library |
| [Cloudflare Docs MCP](https://github.com/cloudflare/mcp-server-cloudflare) | Look up Workers, D1, KV, R2, Durable Objects docs |
| [Astro Docs MCP](https://github.com/withastro/docs/tree/main/mcp-server) | Search Astro framework documentation |

### Using with Claude Code

When working with Claude Code, these MCP servers let you ask questions like:

- "How do I access Cloudflare bindings in my Worker?"
- "What's the Astro middleware API?"
- "How do I configure D1 migrations?"

The AI can fetch up-to-date documentation directly instead of relying on training data.

### Setup Example

Add to your Claude Code MCP configuration (`~/.claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "cloudflare-docs": {
      "command": "npx",
      "args": ["-y", "@cloudflare/mcp-server-cloudflare"]
    },
    "astro-docs": {
      "command": "npx",
      "args": ["-y", "@astrojs/mcp-server"]
    }
  }
}
```

## Why This Stack?

1. **Zero Network Latency** — Frontend and backend in the same Cloudflare Worker
2. **End-to-End Type Safety** — tRPC + Zod + TypeScript
3. **Global Performance** — 300+ Cloudflare edge locations
4. **Simple Architecture** — One codebase, one deployment
5. **Tailwind v4** — Latest CSS-first configuration with `@theme`

## License

MIT
