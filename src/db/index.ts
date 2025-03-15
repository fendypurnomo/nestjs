import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';

import * as schema from './schema';
import * as relations from './relations';

config({ path: '.env' });

export const db = drizzle(process.env.PG_PUBLIC_URL!, {
    schema: { ...schema, ...relations }
});
