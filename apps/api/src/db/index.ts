import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/db/schema";
import env from "@/env";

export const db = drizzle({
  connection: {
    connectionString: env.DATABASE_URL,
  },
  schema,
  logger: true,
  casing: "snake_case",
});

export type db = typeof db;

export default db;
