import { BaseRepository } from "./BaseRepository";
import { apiKeys, OrganizationId } from "../db/schema";
import { db } from "../db";
import { eq, desc } from "drizzle-orm";

export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;

export class ApiKeyRepository extends BaseRepository<typeof apiKeys> {
  constructor() {
    super(apiKeys);
  }

  async findByKey(key: string): Promise<(ApiKey & { organization: any }) | undefined> {
    return await db.query.apiKeys.findFirst({
      where: eq(apiKeys.key, key),
      with: { organization: true },
    });
  }

  async findByOrganizationId(organizationId: OrganizationId): Promise<ApiKey[]> {
    return await db.query.apiKeys.findMany({
      where: eq(apiKeys.organizationId, organizationId),
      orderBy: [desc(apiKeys.createdAt)],
    });
  }
}
