import { OrganizationRepository, NewOrganization } from "../repositories/OrganizationRepository";

export class OrganizationService {
  private repo = new OrganizationRepository();

  async getOrCreateByClerkId(clerkId: string, defaultName: string = "My Organization") {
    let org = await this.repo.findByClerkId(clerkId);
    
    if (!org) {
      org = await this.repo.create({
        clerkId,
        name: defaultName,
      });
    }
    
    return org;
  }

  async getById(id: string) {
    return await this.repo.findById(id);
  }
}


