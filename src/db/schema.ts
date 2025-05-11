/**
 * Run command "bunx drizzle-kit push" to push the schema changes
 *
 * Run Command "bunx drizzle-kit studio". This will open a GUI to view and manage your database schema.
 */
import { relations } from "drizzle-orm";
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

// https://orm.drizzle.team/docs/relations
export const userRelations = relations(users, ({ many }) => ({
  videos: many(videos),
}));

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(), // indexed behind the scenes
    name: text("name").notNull().unique(),
    description: text("description"),
    createAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [uniqueIndex("name_idx").on(table.name)]
);
// relations(users....)
export const categoryRelations = relations(categories, ({ many }) => ({
  videos: many(videos),
}));

export const videos = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  // foreign key to delete all videos if user is deleted
  userId: uuid("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  categoryId: uuid("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// relations do not cause a change on schema when pushing via drizzle-kit push.
// https://orm.drizzle.team/docs/relations#foreign-keys
export const videoRelations = relations(videos, ({ one }) => ({
  user: one(users, {
    fields: [videos.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [videos.categoryId],
    references: [categories.id],
  }),
}));
