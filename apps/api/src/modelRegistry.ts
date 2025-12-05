export type ModelConfig = {
  provider: "bedrock" | "crusoe" | "together" | "own-cluster";
  providerModelId: string;
};

const MODEL_REGISTRY: Record<string, ModelConfig> = {
  // AWS Bedrock Models
  "llama3-8b-instruct": {
    provider: "bedrock",
    providerModelId: "meta.llama3-8b-instruct-v1:0", // Ensure correct Bedrock ID
  },
  // Crusoe Custom VM Models
  "llama3-70b-crusoe": {
    provider: "own-cluster", // Using own-cluster for custom VM integration
    providerModelId: "meta-llama/Meta-Llama-3-70B-Instruct", // Model ID expected by vLLM
  },
};

export function resolveModel(modelId: string): ModelConfig | null {
  return MODEL_REGISTRY[modelId] ?? null;
}

