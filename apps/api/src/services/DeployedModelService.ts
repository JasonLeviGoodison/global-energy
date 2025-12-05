import { DeployedModelRepository, NewDeployedModel } from "../repositories/DeployedModelRepository";

export class DeployedModelService {
  private repo = new DeployedModelRepository();

  async getByOrganizationId(organizationId: string) {
    return await this.repo.findByOrganizationId(organizationId);
  }

  async create(data: NewDeployedModel) {
    return await this.repo.create(data);
  }

  async findByIdOrName(organizationId: string, modelIdentifier: string) {
    return await this.repo.findByIdOrName(organizationId, modelIdentifier);
  }
}


