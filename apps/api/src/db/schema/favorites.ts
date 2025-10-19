import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const favorites = pgTable("favorites", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  placeId: integer("place_id").notNull().unique(),
  displayName: text("display_name").notNull(),
  dateAdded: timestamp("date_added").defaultNow(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});
