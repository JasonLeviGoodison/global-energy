import { BaseRepository } from "./BaseRepository";
import { clusters, ClusterId, OrganizationId, ClusterStatus } from "../db/schema";
import { db } from "../db";
import { eq, desc, and, ne } from "drizzle-orm";

export type Cluster = typeof clusters.$inferSelect;
export type NewCluster = typeof clusters.$inferInsert;

export class ClusterRepository extends BaseRepository<typeof clusters> {
  constructor() {
    super(clusters);
  }

  async findByOrganizationId(organizationId: OrganizationId): Promise<Cluster[]> {
    return await db.query.clusters.findMany({
      where: and(
        eq(clusters.organizationId, organizationId),
        ne(clusters.status, "deleted")
      ),
      orderBy: [desc(clusters.createdAt)],
    });
  }

  async findByIdAndOrganization(
    id: ClusterId,
    organizationId: OrganizationId
  ): Promise<Cluster | undefined> {
    return await db.query.clusters.findFirst({
      where: and(
        eq(clusters.id, id),
        eq(clusters.organizationId, organizationId)
      ),
    });
  }

  async findActiveByOrganization(organizationId: OrganizationId): Promise<Cluster[]> {
    return await db.query.clusters.findMany({
      where: and(
        eq(clusters.organizationId, organizationId),
        eq(clusters.status, "ready")
      ),
      orderBy: [desc(clusters.createdAt)],
    });
  }

  async updateStatus(id: ClusterId, status: ClusterStatus): Promise<Cluster> {
    const [result] = await db
      .update(clusters)
      .set({ status, updatedAt: new Date() })
      .where(eq(clusters.id, id))
      .returning();
    return result;
  }

  async updateApiServerEndpoint(id: ClusterId, endpoint: string): Promise<Cluster> {
    const [result] = await db
      .update(clusters)
      .set({ apiServerEndpoint: endpoint, updatedAt: new Date() })
      .where(eq(clusters.id, id))
      .returning();
    return result;
  }

  async softDelete(id: ClusterId): Promise<Cluster> {
    const [result] = await db
      .update(clusters)
      .set({ status: "deleted", deletedAt: new Date(), updatedAt: new Date() })
      .where(eq(clusters.id, id))
      .returning();
    return result;
  }
}



