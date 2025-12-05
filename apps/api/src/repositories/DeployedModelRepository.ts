import { BaseRepository } from "./BaseRepository";
import { deployedModels } from "../db/schema";
import { db } from "../db";
import { eq, desc, or, sql } from "drizzle-orm";

export type DeployedModel = typeof deployedModels.$inferSelect;
export type NewDeployedModel = typeof deployedModels.$inferInsert;

export class DeployedModelRepository extends BaseRepository<DeployedModel> {
  protected table = deployedModels;
  protected tableName = "deployedModels";

  async findByOrganizationId(organizationId: string): Promise<DeployedModel[]> {
    return await db.query.deployedModels.findMany({
      where: eq(deployedModels.organizationId, organizationId),
      orderBy: [desc(deployedModels.createdAt)]
    });
  }

  async findByIdOrName(organizationId: string, modelIdentifier: string): Promise<DeployedModel | undefined> {
    return await db.query.deployedModels.findFirst({
      where: sql`${deployedModels.organizationId} = ${organizationId} AND (${deployedModels.id} = ${modelIdentifier} OR ${deployedModels.name} = ${modelIdentifier})`
    });
  }
}


