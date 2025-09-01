import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";

const user = pgTable("user", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export default user;
