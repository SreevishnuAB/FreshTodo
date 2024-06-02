import { uuid, pgTable, pgEnum, timestamp, text } from "npm:drizzle-orm@latest/pg-core";

export const todoPriorityEnum = pgEnum("todopriority", ["LOW", "MEDIUM", "HIGH", "VERY HIGH"]);
export const todoStatusEnum = pgEnum("todostatus", ["CREATED", "IN PROGRESS", "COMPLETED", "INACTIVE"]);

export const todos = pgTable("todos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  details: text("details"),
  priority: todoPriorityEnum("priority").notNull(),
  status: todoStatusEnum("status").notNull(),
  createdAt: timestamp("created_at", {withTimezone: true}).notNull().defaultNow(),
  modifiedAt: timestamp("modified_at", {withTimezone: true}).notNull().defaultNow(),
  completedAt: timestamp("completed_at", {withTimezone: true})
});