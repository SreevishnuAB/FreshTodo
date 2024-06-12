import { migrate } from "drizzle-orm/postgres-js/migrator";
import { migrationClient, connection } from "./client.ts";

await migrate(migrationClient, { migrationsFolder: './drizzle' })
await connection.end();