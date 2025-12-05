import { BaseRepository } from "./BaseRepository";
import { organizations } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;

export class OrganizationRepository extends BaseRepository<typeof organizations> {
  constructor() {
    super(organizations);
  }

  async findByExternalId(externalId: string): Promise<Organization | undefined> {
    return await db.query.organizations.findFirst({
      where: eq(organizations.externalId, externalId),
    });
  }
}
