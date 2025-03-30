/**
 * Run command "bunx drizzle-kit push" to push the schema changes
 *
 * Run Command "bunx drizzle-kit studio". This will open a GUI to view and manage your database schema.
 */

import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clerkId: text("clerk_id").unique().notNull(),
    name: text("name").notNull(),
    // TODO: Add banner fields
    imageUrl: text("image_url").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [uniqueIndex("clerk_id_idx").on(table.clerkId)]
);
