import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import type { Env } from '../../env';
import { createDb } from '../../db';

export const createContext = async (
    opts: FetchCreateContextFnOptions,
    env: Env,
    ctx: ExecutionContext
) => {
    const db = createDb(env.DB);
    return {
        db,
        env,
        ctx,
        ...opts,
    };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
