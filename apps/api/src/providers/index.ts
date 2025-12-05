import { LLMProvider } from "../types";
import { BedrockProvider } from "./bedrockProvider";
import { CrusoeVMProvider } from "./crusoeProvider";

const bedrockProvider = new BedrockProvider();
const crusoeProvider = new CrusoeVMProvider();

const PROVIDERS: Record<string, LLMProvider> = {
  bedrock: bedrockProvider,
  "own-cluster": crusoeProvider,
};

export function getProvider(name: string): LLMProvider | null {
  return PROVIDERS[name] ?? null;
}

