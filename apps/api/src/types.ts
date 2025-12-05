export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatRequest = {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
};

export type ChatChoice = {
  index: number;
  message: ChatMessage;
  finish_reason: "stop" | "length" | "content_filter" | string;
};

export type ChatResponse = {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: ChatChoice[];
};

export interface LLMProvider {
  name: string;
  chat(request: ChatRequest, providerModelId: string): Promise<ChatResponse>;
}

