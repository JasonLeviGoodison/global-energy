import { OrganizationId, DeployedModelId } from "../db/schema";
import { ApiUsageRepository, NewApiUsage } from "../repositories/ApiUsageRepository";
import { DeployedModelRepository } from "../repositories/DeployedModelRepository";
import type { AnalyticsResult, OverviewAnalytics, ModelAnalytics } from "../types/analytics";

export class AnalyticsService {
  private usageRepo = new ApiUsageRepository();
  private modelRepo = new DeployedModelRepository();

  async trackUsage(data: NewApiUsage) {
    return await this.usageRepo.create(data);
  }

  async getAnalyticsByOrganization(organizationId: OrganizationId): Promise<AnalyticsResult[]> {
    const usage = await this.usageRepo.getUsageByOrganization(organizationId);

    const modelIds = usage.map((u) => u.deployedModelId);
    const models = await Promise.all(
      modelIds.map((id) => this.modelRepo.findById(id as DeployedModelId))
    );

    return usage.map((u) => {
      const model = models.find((m) => m?.id === u.deployedModelId);
      return {
        modelName: model?.name || "Unknown",
        modelId: u.deployedModelId,
        totalTokens: u.totalTokens,
        totalRequests: u.totalRequests,
      };
    });
  }

  async getOverviewAnalytics(
    organizationId: OrganizationId,
    days: number = 30
  ): Promise<OverviewAnalytics> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [stats, timeSeries, modelBreakdown] = await Promise.all([
      this.usageRepo.getOverviewStats(organizationId, startDate),
      this.usageRepo.getTimeSeriesByOrganization(organizationId, startDate),
      this.getAnalyticsByOrganization(organizationId),
    ]);

    return {
      stats,
      timeSeries,
      modelBreakdown,
    };
  }

  async getModelAnalytics(modelId: DeployedModelId, days: number = 30): Promise<ModelAnalytics> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const model = await this.modelRepo.findById(modelId);
    if (!model) {
      throw new Error("Model not found");
    }

    const [timeSeries, allOrgUsage] = await Promise.all([
      this.usageRepo.getTimeSeriesByModel(modelId, startDate),
      this.usageRepo.getUsageByOrganization(model.organizationId),
    ]);

    const modelUsage = allOrgUsage.find((u) => u.deployedModelId === modelId);
    const totalTokens = modelUsage?.totalTokens || 0;
    const totalRequests = modelUsage?.totalRequests || 0;

    return {
      modelId,
      modelName: model.name,
      totalTokens,
      totalRequests,
      avgTokensPerRequest: totalRequests > 0 ? Math.round(totalTokens / totalRequests) : 0,
      timeSeries,
    };
  }
}
