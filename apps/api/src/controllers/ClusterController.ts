import { Request, Response } from "express";
import type { WithAuthProp } from "@clerk/clerk-sdk-node";
import { z } from "zod";
import { ClusterService } from "../services/ClusterService";
import { OrganizationService } from "../services/OrganizationService";
import { ClusterId } from "../db/schema";

const createClusterSchema = z.object({
  name: z.string().min(1).max(63).regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, {
    message: "Name must be lowercase alphanumeric with hyphens, starting and ending with alphanumeric",
  }),
  k8sVersion: z.string(),
  workerNodeCount: z.number().int().min(1).max(100),
  gpuType: z.string().optional(),
});

export class ClusterController {
  private service = new ClusterService();
  private orgService = new OrganizationService();

  getAll = async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const org = await this.orgService.getOrCreateByExternalUserId(userId);
    const clusters = await this.service.getByOrganizationId(org.id);
    res.json(clusters);
  };

  getById = async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    const org = await this.orgService.getOrCreateByExternalUserId(userId);
    const cluster = await this.service.getById(id as ClusterId, org.id);

    if (!cluster) {
      return res.status(404).json({ error: "Cluster not found" });
    }

    res.json(cluster);
  };

  create = async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const parseResult = createClusterSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        error: "Invalid request data",
        details: parseResult.error.errors,
      });
    }

    const org = await this.orgService.getOrCreateByExternalUserId(userId);

    const cluster = await this.service.create({
      name: parseResult.data.name,
      k8sVersion: parseResult.data.k8sVersion,
      workerNodeCount: parseResult.data.workerNodeCount,
      gpuType: parseResult.data.gpuType,
      organizationId: org.id,
    });

    res.status(201).json(cluster);
  };

  delete = async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    const org = await this.orgService.getOrCreateByExternalUserId(userId);

    const cluster = await this.service.delete(id as ClusterId, org.id);
    res.json(cluster);
  };

  getKubeconfig = async (req: WithAuthProp<Request>, res: Response) => {
    const userId = req.auth?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    const org = await this.orgService.getOrCreateByExternalUserId(userId);

    const kubeconfig = await this.service.getKubeconfig(id as ClusterId, org.id);

    res.setHeader("Content-Type", "text/yaml");
    res.setHeader("Content-Disposition", `attachment; filename="${id}-kubeconfig.yaml"`);
    res.send(kubeconfig);
  };

  getOptions = async (_req: Request, res: Response) => {
    res.json({
      k8sVersions: this.service.getSupportedVersions(),
      gpuTypes: this.service.getSupportedGpuTypes(),
    });
  };
}



