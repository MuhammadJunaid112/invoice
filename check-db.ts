import * as dotenv from "dotenv";
dotenv.config();
console.log("DB URL (masked):", process.env.XATA_DATABASE_URL?.substring(0, 20) + "...");

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";

async function check() {
    try {
        const pool = new Pool({
            connectionString: process.env.XATA_DATABASE_URL,
        });
        const db = drizzle(pool);

        const result = await db.execute(sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
        console.log("Tables in 'public' schema:");
        console.log(result.rows);
    } catch (error) {
        console.error("Error connecting to DB:", error);
    } finally {
        process.exit();
    }
}

check();
