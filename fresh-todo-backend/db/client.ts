import { PrismaClient } from "../generated/client/index.d.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";



const env = await load();

const prismaClient: PrismaClient = new PrismaClient({
  datasourceUrl: env.DATABASE_URL
});

export default prismaClient;