import { Request, Response } from "express";
import type { WithAuthProp } from "@clerk/clerk-sdk-node";
import { z } from "zod";
import { DeployedModelService } from "../services/DeployedModelService";
import { OrganizationService } from "../services/OrganizationService";

const createModelSchema = z.object({
  name: z.string().min(1),
  provider: z.string(),
  providerModelId: z.string(),
});

export class DeployedModelController {
  private service = new DeployedModelService();
  private orgService = new OrganizationService();

  getAll = async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const org = await this.orgService.getOrCreateByExternalUserId(userId);
      const models = await this.service.getByOrganizationId(org.id);
      res.json(models);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch models" });
    }
  };

  create = async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const body = createModelSchema.parse(req.body);
      const org = await this.orgService.getOrCreateByExternalUserId(userId);

      const model = await this.service.create({
        name: body.name,
        provider: body.provider,
        providerModelId: body.providerModelId,
        organizationId: org.id,
      });

      res.json(model);
    } catch (e) {
      console.error("Error deploying model:", e);
      if (e instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request data",
          details: e.errors,
        });
      }
      res.status(500).json({ error: "Failed to deploy model" });
    }
  };
}
