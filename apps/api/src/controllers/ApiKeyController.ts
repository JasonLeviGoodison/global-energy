import { Request, Response } from "express";
import type { WithAuthProp } from "@clerk/clerk-sdk-node";
import { ApiKeyService } from "../services/ApiKeyService";
import { OrganizationService } from "../services/OrganizationService";

export class ApiKeyController {
  private service = new ApiKeyService();
  private orgService = new OrganizationService();

  getAll = async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const org = await this.orgService.getOrCreateByClerkId(userId);
      const keys = await this.service.getByOrganizationId(org.id);
      res.json(keys);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch API keys" });
    }
  };

  create = async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const org = await this.orgService.getOrCreateByClerkId(userId);
      const newKey = await this.service.createForOrganization(org.id);
      res.json(newKey);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to create API key" });
    }
  };
}
