import { pgTable, text } from "drizzle-orm/pg-core";
import { baseFields, foreignKeyRelationId, BaseId } from "../utils";
import { organizations } from "./organizations";

export type DeployedModelId = BaseId<"deployed_models">;

export const deployedModels = pgTable("deployed_model", {
  ...baseFields<"deployed_model">(),
  name: text("name").notNull(),
  provider: text("provider").notNull(),
  providerModelId: text("provider_model_id").notNull(),
  organizationId: foreignKeyRelationId(organizations).notNull(),
});
