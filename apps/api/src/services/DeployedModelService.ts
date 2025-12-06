import { DeployedModelId } from "../db/schema";
import { OrganizationId } from "../db/tables/organizations";
import { DeployedModelRepository, NewDeployedModel } from "../repositories/DeployedModelRepository";

export class DeployedModelService {
  private repo = new DeployedModelRepository();

  async getByOrganizationId(organizationId: OrganizationId) {
    return await this.repo.findByOrganizationId(organizationId);
  }

  async create(data: NewDeployedModel) {
    return await this.repo.create(data);
  }

  async findByIdOrName(organizationId: OrganizationId, modelIdentifier: string) {
    return await this.repo.findByIdOrName(organizationId, modelIdentifier);
  }

  async delete(id: DeployedModelId) {
    return await this.repo.delete(id);
  }
}
