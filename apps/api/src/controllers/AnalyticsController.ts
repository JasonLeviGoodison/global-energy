import { Request, Response } from "express";
import type { WithAuthProp } from "@clerk/clerk-sdk-node";
import { AnalyticsService } from "../services/AnalyticsService";
import { OrganizationService } from "../services/OrganizationService";
import { DeployedModelId } from "../db/schema";

export class AnalyticsController {
  private service = new AnalyticsService();
  private orgService = new OrganizationService();

  getAnalytics = async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const org = await this.orgService.getOrCreateByExternalUserId(userId);
      const analytics = await this.service.getAnalyticsByOrganization(org.id);
      res.json(analytics);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  };

  getOverview = async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const org = await this.orgService.getOrCreateByExternalUserId(userId);
      const days = parseInt(req.query.days as string) || 30;
      const analytics = await this.service.getOverviewAnalytics(org.id, days);
      res.json(analytics);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch overview analytics" });
    }
  };

  getModelAnalytics = async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { modelId } = req.params;
    if (!modelId) {
      return res.status(400).json({ error: "Model ID is required" });
    }

    try {
      const days = parseInt(req.query.days as string) || 30;
      const analytics = await this.service.getModelAnalytics(modelId as DeployedModelId, days);
      res.json(analytics);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch model analytics" });
    }
  };
}
