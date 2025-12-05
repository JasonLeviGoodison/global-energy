import { BaseRepository } from "./BaseRepository";
import { apiKeys } from "../db/schema";
import { db } from "../db";
import { eq, desc } from "drizzle-orm";

export type ApiKey = typeof apiKeys.$inferSelect;
export type NewApiKey = typeof apiKeys.$inferInsert;

export class ApiKeyRepository extends BaseRepository<ApiKey> {
  protected table = apiKeys;
  protected tableName = "apiKeys";

  async findByKey(key: string): Promise<(ApiKey & { organization: any }) | undefined> {
    return await db.query.apiKeys.findFirst({
      where: eq(apiKeys.key, key),
      with: { organization: true }
    });
  }

  async findByOrganizationId(organizationId: string): Promise<ApiKey[]> {
    return await db.query.apiKeys.findMany({
      where: eq(apiKeys.organizationId, organizationId),
      orderBy: [desc(apiKeys.createdAt)]
    });
  }
}


