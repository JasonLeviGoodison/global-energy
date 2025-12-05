import { pgTable, uuid, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const organizations = pgTable("organizations", {
  id: uuid("id").primaryKey().defaultRandom(),
  externalId: text("external_id").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { precision: 3, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).notNull().defaultNow(),
});

export const apiKeys = pgTable("api_keys", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: text("key").notNull().unique(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  createdAt: timestamp("created_at", { precision: 3, mode: "date" }).notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
});

export const deployedModels = pgTable("deployed_models", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  provider: text("provider").notNull(),
  providerModelId: text("provider_model_id").notNull(),
  organizationId: uuid("organization_id")
    .notNull()
    .references(() => organizations.id),
  createdAt: timestamp("created_at", { precision: 3, mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 3, mode: "date" }).notNull().defaultNow(),
});

export const apiUsage = pgTable("api_usage", {
  id: uuid("id").primaryKey().defaultRandom(),
  apiKeyId: uuid("api_key_id")
    .notNull()
    .references(() => apiKeys.id),
  deployedModelId: uuid("deployed_model_id")
    .notNull()
    .references(() => deployedModels.id),
  tokensUsed: integer("tokens_used").notNull(),
  timestamp: timestamp("timestamp", { precision: 3, mode: "date" }).notNull().defaultNow(),
});

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
