import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { ChatRequest, ChatResponse, ChatMessage, LLMProvider } from "../types";

const client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    }
});

export class BedrockProvider implements LLMProvider {
  name = "bedrock" as const;

  async chat(
    request: ChatRequest,
    providerModelId: string
  ): Promise<ChatResponse> {
    const { messages, temperature = 0.7, max_tokens = 256 } = request;

    // Convert OpenAI-style messages into Bedrock's input format (Llama 3 specific)
    // Llama 3 prompt format:
    // <|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{user_prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n
    
    let prompt = "<|begin_of_text|>";
    for (const msg of messages) {
        prompt += `<|start_header_id|>${msg.role}<|end_header_id|>\n\n${msg.content}<|eot_id|>`;
    }
    prompt += "<|start_header_id|>assistant<|end_header_id|>\n\n";

    const body = JSON.stringify({
      prompt,
      temperature,
      max_gen_len: max_tokens,
    });

    const cmd = new InvokeModelCommand({
      modelId: providerModelId,
      body,
      contentType: "application/json",
      accept: "application/json",
    });

    try {
        const response = await client.send(cmd);
        const decoded = new TextDecoder().decode(response.body);
        const parsed = JSON.parse(decoded) as {
            generation: string;
            prompt_token_count: number;
            generation_token_count: number;
            stop_reason: string;
        };

        const assistantMessage: ChatMessage = {
            role: "assistant",
            content: parsed.generation.trim(),
        };

        const now = Math.floor(Date.now() / 1000);
        const chatResponse: ChatResponse = {
            id: `chatcmpl_${now}_${Math.random().toString(36).slice(2)}`,
            object: "chat.completion",
            created: now,
            model: request.model,
            choices: [
            {
                index: 0,
                message: assistantMessage,
                finish_reason: parsed.stop_reason ?? "stop",
            },
            ],
        };

        return chatResponse;

    } catch (error: any) {
        console.error("Bedrock Error:", error);
        throw new Error(`Bedrock API Error: ${error.message}`);
    }
  }
}

