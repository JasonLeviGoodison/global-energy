export type DeployedModel = {
  id: string;
  name: string;
  provider: string;
  providerModelId: string;
  createdAt: string;
};

export type ModelInfo = {
  id: string;
  name: string;
  provider: string;
  description: string;
  contextLength: number;
};

export type ModelCatalog = {
  bedrock: ModelInfo[];
  crusoe: ModelInfo[];
};
