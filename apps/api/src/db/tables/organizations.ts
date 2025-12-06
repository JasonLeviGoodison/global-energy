import { pgTable, text } from "drizzle-orm/pg-core";
import { baseFields, BaseId } from "../utils";

export type OrganizationId = BaseId<"organization">;

export const organizations = pgTable("organization", {
  ...baseFields<"organization">(),
  externalId: text("external_id").notNull().unique(),
  name: text("name").notNull(),
});
