import { pgTable, text, boolean } from "drizzle-orm/pg-core";
import { baseFields, foreignKeyRelationId, BaseId } from "../utils";
import { organizations } from "./organizations";

export type ApiKeyId = BaseId<"api_key">;

export const apiKeys = pgTable("api_key", {
  ...baseFields<"api_key">(),
  key: text("key").notNull().unique(),
  organizationId: foreignKeyRelationId(organizations).notNull(),
  isActive: boolean("is_active").notNull().default(true),
});
