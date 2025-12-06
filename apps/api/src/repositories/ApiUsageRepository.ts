import { BaseRepository } from "./BaseRepository";
import { apiUsage, DeployedModelId, deployedModels, OrganizationId } from "../db/schema";
import { db } from "../db";
import { eq, sql, and, gte, lte } from "drizzle-orm";
import type { UsageStats, TimeSeriesData, OverviewStats } from "../types/analytics";

export type ApiUsage = typeof apiUsage.$inferSelect;
export type NewApiUsage = typeof apiUsage.$inferInsert;

export class ApiUsageRepository extends BaseRepository<typeof apiUsage> {
  constructor() {
    super(apiUsage);
  }

  async getUsageByOrganization(organizationId: OrganizationId): Promise<UsageStats[]> {
    const usage = await db
      .select({
        deployedModelId: apiUsage.deployedModelId,
        totalTokens: sql<number>`sum(${apiUsage.tokensUsed})`,
        totalRequests: sql<number>`count(${apiUsage.id})`,
      })
      .from(apiUsage)
      .innerJoin(deployedModels, eq(apiUsage.deployedModelId, deployedModels.id))
      .where(eq(deployedModels.organizationId, organizationId))
      .groupBy(apiUsage.deployedModelId);

    return usage.map((u) => ({
      deployedModelId: u.deployedModelId,
      totalTokens: Number(u.totalTokens) || 0,
      totalRequests: Number(u.totalRequests) || 0,
    }));
  }

  async getOverviewStats(
    organizationId: OrganizationId,
    startDate?: Date,
    endDate?: Date
  ): Promise<OverviewStats> {
    const conditions = [eq(deployedModels.organizationId, organizationId)];

    if (startDate) {
      conditions.push(gte(apiUsage.createdAt, startDate));
    }
    if (endDate) {
      conditions.push(lte(apiUsage.createdAt, endDate));
    }

    const result = await db
      .select({
        totalRequests: sql<number>`count(${apiUsage.id})`,
        totalTokens: sql<number>`sum(${apiUsage.tokensUsed})`,
        uniqueModels: sql<number>`count(distinct ${apiUsage.deployedModelId})`,
        avgTokensPerRequest: sql<number>`avg(${apiUsage.tokensUsed})`,
      })
      .from(apiUsage)
      .innerJoin(deployedModels, eq(apiUsage.deployedModelId, deployedModels.id))
      .where(and(...conditions));

    const stats = result[0];
    return {
      totalRequests: Number(stats.totalRequests) || 0,
      totalTokens: Number(stats.totalTokens) || 0,
      uniqueModels: Number(stats.uniqueModels) || 0,
      avgTokensPerRequest: Math.round(Number(stats.avgTokensPerRequest) || 0),
    };
  }

  async getTimeSeriesByOrganization(
    organizationId: OrganizationId,
    startDate?: Date,
    endDate?: Date
  ): Promise<TimeSeriesData[]> {
    const conditions = [eq(deployedModels.organizationId, organizationId)];

    if (startDate) {
      conditions.push(gte(apiUsage.createdAt, startDate));
    }
    if (endDate) {
      conditions.push(lte(apiUsage.createdAt, endDate));
    }

    const timeSeries = await db
      .select({
        date: sql<string>`DATE(${apiUsage.createdAt})`,
        totalTokens: sql<number>`sum(${apiUsage.tokensUsed})`,
        totalRequests: sql<number>`count(${apiUsage.id})`,
      })
      .from(apiUsage)
      .innerJoin(deployedModels, eq(apiUsage.deployedModelId, deployedModels.id))
      .where(and(...conditions))
      .groupBy(sql`DATE(${apiUsage.createdAt})`)
      .orderBy(sql`DATE(${apiUsage.createdAt})`);

    return timeSeries.map((ts) => ({
      date: ts.date,
      totalTokens: Number(ts.totalTokens) || 0,
      totalRequests: Number(ts.totalRequests) || 0,
    }));
  }

  async getTimeSeriesByModel(
    deployedModelId: DeployedModelId,
    startDate?: Date,
    endDate?: Date
  ): Promise<TimeSeriesData[]> {
    const conditions = [eq(apiUsage.deployedModelId, deployedModelId)];

    if (startDate) {
      conditions.push(gte(apiUsage.createdAt, startDate));
    }
    if (endDate) {
      conditions.push(lte(apiUsage.createdAt, endDate));
    }

    const timeSeries = await db
      .select({
        date: sql<string>`DATE(${apiUsage.createdAt})`,
        totalTokens: sql<number>`sum(${apiUsage.tokensUsed})`,
        totalRequests: sql<number>`count(${apiUsage.id})`,
      })
      .from(apiUsage)
      .where(and(...conditions))
      .groupBy(sql`DATE(${apiUsage.createdAt})`)
      .orderBy(sql`DATE(${apiUsage.createdAt})`);

    return timeSeries.map((ts) => ({
      date: ts.date,
      totalTokens: Number(ts.totalTokens) || 0,
      totalRequests: Number(ts.totalRequests) || 0,
    }));
  }
}
