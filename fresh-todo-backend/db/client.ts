import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import postgres from "https://deno.land/x/postgresjs/mod.js";
import { drizzle }  from "npm:drizzle-orm@latest/postgres-js";
import { migrate } from 'npm:drizzle-orm@latest/postgres-js/migrator';




const env = await load();

const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
// migrate(drizzle(migrationClient), ...);

const queryClient = postgres(env.DATABASE_URL);

const dbClient = drizzle(queryClient);

export default dbClient;