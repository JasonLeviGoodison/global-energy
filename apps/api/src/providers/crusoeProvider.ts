import axios from "axios";
import { ChatRequest, ChatResponse, LLMProvider } from "../types";

export class CrusoeVMProvider implements LLMProvider {
  name = "own-cluster" as const;

  async chat(
    request: ChatRequest,
    providerModelId: string
  ): Promise<ChatResponse> {
    const { messages, temperature, max_tokens } = request;
    const vmUrl = process.env.CRUSOE_VM_URL;
    const vmKey = process.env.CRUSOE_VM_KEY;

    if (!vmUrl) {
        throw new Error("CRUSOE_VM_URL not configured");
    }

    // The Crusoe VM (vLLM) is expected to expose an OpenAI-compatible endpoint
    const url = `${vmUrl.replace(/\/+$/, "")}/chat/completions`;

    try {
      const response = await axios.post(
        url,
        {
          model: providerModelId,
          messages,
          temperature,
          max_tokens,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(vmKey ? { Authorization: `Bearer ${vmKey}` } : {}),
          },
        }
      );

      // Pass through the response directly as it should already be OpenAI compatible
      return response.data as ChatResponse;
    } catch (error: any) {
      console.error("Crusoe VM Error:", error.response?.data || error.message);
      throw new Error(`Crusoe VM Provider Error: ${error.message}`);
    }
  }
}

