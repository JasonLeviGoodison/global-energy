import { pgTable, integer } from "drizzle-orm/pg-core";
import { baseFields, foreignKeyRelationId, BaseId } from "../utils";
import { apiKeys } from "./apiKeys";
import { deployedModels } from "./deployedModels";

export type ApiUsageId = BaseId<"api_usage">;

export const apiUsage = pgTable("api_usage", {
  ...baseFields<"api_usage">(),
  apiKeyId: foreignKeyRelationId(apiKeys).notNull(),
  deployedModelId: foreignKeyRelationId(deployedModels).notNull(),
  tokensUsed: integer("tokens_used").notNull(),
});
