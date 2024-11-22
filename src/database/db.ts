import { drizzle } from "drizzle-orm/bun-sqlite";
import { sql } from "drizzle-orm";
import { Database } from "bun:sqlite";

const sqlite = new Database("sqlite.db");

const db = drizzle(sqlite);

const testConnection = async () => {
  try {
    const result = await db.select({ test: sql`SELECT 1` });
    console.log("✅   Database connection successful");
  } catch (error) {
    console.error("❌   Database connection failed:", error);
    process.exit(1);
  }
};

export { db, testConnection };
