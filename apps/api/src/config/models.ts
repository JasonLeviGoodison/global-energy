export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  description: string;
  contextLength: number;
}

export interface ModelCatalog {
  bedrock: ModelInfo[];
  crusoe: ModelInfo[];
}

export const MODEL_CATALOG: ModelCatalog = {
  bedrock: [
    {
      id: "meta.llama3-8b-instruct-v1:0",
      name: "Llama 3 8B Instruct",
      provider: "Meta",
      description: "Fast and efficient model for general tasks",
      contextLength: 8192,
    },
    {
      id: "meta.llama3-70b-instruct-v1:0",
      name: "Llama 3 70B Instruct",
      provider: "Meta",
      description: "Powerful model for complex reasoning",
      contextLength: 8192,
    },
    {
      id: "anthropic.claude-3-5-sonnet-20240620-v1:0",
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      description: "Most intelligent Claude model, great for coding and analysis",
      contextLength: 200000,
    },
    {
      id: "anthropic.claude-3-sonnet-20240229-v1:0",
      name: "Claude 3 Sonnet",
      provider: "Anthropic",
      description: "Balanced performance and speed",
      contextLength: 200000,
    },
    {
      id: "anthropic.claude-3-haiku-20240307-v1:0",
      name: "Claude 3 Haiku",
      provider: "Anthropic",
      description: "Fastest Claude model for simple tasks",
      contextLength: 200000,
    },
    {
      id: "amazon.titan-text-express-v1",
      name: "Titan Text Express",
      provider: "Amazon",
      description: "Cost-effective model for general text tasks",
      contextLength: 8192,
    },
  ],
  crusoe: [
    {
      id: "llama-3-8b-instruct",
      name: "Llama 3 8B Instruct",
      provider: "Meta",
      description: "Fast and efficient model for general tasks",
      contextLength: 8192,
    },
    {
      id: "llama-3-70b-instruct",
      name: "Llama 3 70B Instruct",
      provider: "Meta",
      description: "Powerful model for complex reasoning",
      contextLength: 8192,
    },
    {
      id: "mistral-7b-instruct",
      name: "Mistral 7B Instruct",
      provider: "Mistral AI",
      description: "Efficient open-source model",
      contextLength: 32768,
    },
    {
      id: "mixtral-8x7b-instruct",
      name: "Mixtral 8x7B Instruct",
      provider: "Mistral AI",
      description: "Mixture of experts model for diverse tasks",
      contextLength: 32768,
    },
  ],
};
