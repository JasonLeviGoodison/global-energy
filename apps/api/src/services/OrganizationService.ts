import { OrganizationId } from "../db/schema";
import { OrganizationRepository, NewOrganization } from "../repositories/OrganizationRepository";

export class OrganizationService {
  private repo = new OrganizationRepository();

  async getOrCreateByExternalUserId(externalId: string, defaultName: string = "My Organization") {
    let org = await this.repo.findByExternalId(externalId);

    if (!org) {
      org = await this.repo.create({
        externalId,
        name: defaultName,
      });
    }

    return org;
  }

  async getById(id: OrganizationId) {
    return await this.repo.findById(id);
  }
}
