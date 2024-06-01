import { PrismaClient } from "../generated/client/deno/edge.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";




const env = await load();

const prismaClient = new PrismaClient({
  datasourceUrl: "postgresql://bot_user:password@localhost:5432/fresh_todo?schema=public"
});

export default prismaClient;