import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import postgres from "postgres";
import { drizzle }  from "drizzle-orm/postgres-js";




const env = await load();

export const migrationClient = postgres(env.DATABASE_URL, { max: 1 });
// migrate(drizzle(migrationClient), ...);

export const connection = postgres(env.DATABASE_URL);

export const dbClient = drizzle(connection);
