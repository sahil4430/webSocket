import {drizzle} from "drizzle-orm/neon-http";
import {neon} from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
//The newer drizzle-orm API (v0.30+) changed the signature from drizzle(sql) to drizzle({ client: sql }). That's all that was needed.
//that why it showing error on export const db = drizzle (sql);
export const db = drizzle({ client: sql });