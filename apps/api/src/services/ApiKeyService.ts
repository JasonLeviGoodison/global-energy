import { ApiKeyRepository } from "../repositories/ApiKeyRepository";
import crypto from "crypto";

export class ApiKeyService {
  private repo = new ApiKeyRepository();

  async getByOrganizationId(organizationId: string) {
    return await this.repo.findByOrganizationId(organizationId);
  }

  async createForOrganization(organizationId: string) {
    const key = `sk_neo_${crypto.randomBytes(16).toString("hex")}`;
    return await this.repo.create({
      key,
      organizationId,
    });
  }

  async validateKey(key: string) {
    const apiKey = await this.repo.findByKey(key);
    
    if (!apiKey || !apiKey.isActive) {
      return null;
    }
    
    return apiKey;
  }
}


