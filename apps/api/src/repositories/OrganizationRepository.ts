import { BaseRepository } from "./BaseRepository";
import { organizations } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;

export class OrganizationRepository extends BaseRepository<Organization> {
  protected table = organizations;
  protected tableName = "organizations";

  async findByClerkId(clerkId: string): Promise<Organization | undefined> {
    return await db.query.organizations.findFirst({
      where: eq(organizations.clerkId, clerkId)
    });
  }
}


