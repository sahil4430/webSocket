import "dotenv/config";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle ({client: sql});

await migrate (db,{
    migrationsFolder: "./drizzle",
})
console.log("✅ Migration completed");