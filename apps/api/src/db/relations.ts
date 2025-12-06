import { relations } from "drizzle-orm";
import { organizations } from "./tables/organizations";
import { apiKeys } from "./tables/apiKeys";
import { deployedModels } from "./tables/deployedModels";
import { apiUsage } from "./tables/apiUsage";

export const organizationsRelations = relations(organizations, ({ many }) => ({
  apiKeys: many(apiKeys),
  deployedModels: many(deployedModels),
}));

export const apiKeysRelations = relations(apiKeys, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [apiKeys.organizationId],
    references: [organizations.id],
  }),
  usage: many(apiUsage),
}));

export const deployedModelsRelations = relations(deployedModels, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [deployedModels.organizationId],
    references: [organizations.id],
  }),
  usage: many(apiUsage),
}));

export const apiUsageRelations = relations(apiUsage, ({ one }) => ({
  apiKey: one(apiKeys, {
    fields: [apiUsage.apiKeyId],
    references: [apiKeys.id],
  }),
  deployedModel: one(deployedModels, {
    fields: [apiUsage.deployedModelId],
    references: [deployedModels.id],
  }),
}));
