import { relations } from "drizzle-orm";
import { organizations } from "./tables/organizations";
import { apiKeys } from "./tables/apiKeys";
import { deployedModels } from "./tables/deployedModels";
import { apiUsage } from "./tables/apiUsage";
import { clusters } from "./tables/clusters";
import { clusterNodes } from "./tables/clusterNodes";
import { clusterUsage } from "./tables/clusterUsage";

export const organizationsRelations = relations(organizations, ({ many }) => ({
  apiKeys: many(apiKeys),
  deployedModels: many(deployedModels),
  clusters: many(clusters),
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

export const clustersRelations = relations(clusters, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [clusters.organizationId],
    references: [organizations.id],
  }),
  nodes: many(clusterNodes),
  usage: many(clusterUsage),
}));

export const clusterNodesRelations = relations(clusterNodes, ({ one }) => ({
  cluster: one(clusters, {
    fields: [clusterNodes.clusterId],
    references: [clusters.id],
  }),
}));

export const clusterUsageRelations = relations(clusterUsage, ({ one }) => ({
  cluster: one(clusters, {
    fields: [clusterUsage.clusterId],
    references: [clusters.id],
  }),
}));
