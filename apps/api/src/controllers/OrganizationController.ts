import { Request, Response } from "express";
import type { WithAuthProp } from "@clerk/clerk-sdk-node";
import { OrganizationService } from "../services/OrganizationService";

export class OrganizationController {
  private service = new OrganizationService();

  getMe = async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const org = await this.service.getOrCreateByClerkId(userId);
      res.json(org);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch organization" });
    }
  };
}
