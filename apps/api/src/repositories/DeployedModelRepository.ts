import { BaseRepository } from "./BaseRepository";
import { deployedModels, OrganizationId } from "../db/schema";
import { db } from "../db";
import { eq, desc, sql } from "drizzle-orm";

export type DeployedModel = typeof deployedModels.$inferSelect;
export type NewDeployedModel = typeof deployedModels.$inferInsert;

export class DeployedModelRepository extends BaseRepository<typeof deployedModels> {
  constructor() {
    super(deployedModels);
  }

  async findByOrganizationId(organizationId: OrganizationId): Promise<DeployedModel[]> {
    return await db.query.deployedModels.findMany({
      where: eq(deployedModels.organizationId, organizationId),
      orderBy: [desc(deployedModels.createdAt)],
    });
  }

  async findByIdOrName(
    organizationId: OrganizationId,
    modelIdentifier: string
  ): Promise<DeployedModel | undefined> {
    return await db.query.deployedModels.findFirst({
      where: sql`${deployedModels.organizationId} = ${organizationId} AND (${deployedModels.id} = ${modelIdentifier} OR ${deployedModels.name} = ${modelIdentifier})`,
    });
  }
}
