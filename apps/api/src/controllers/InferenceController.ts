import { Request, Response } from "express";
import { z } from "zod";
import { ChatRequest } from "../types";
import { resolveModel } from "../modelRegistry";
import { getProvider } from "../providers";
import { DeployedModelService } from "../services/DeployedModelService";
import { AnalyticsService } from "../services/AnalyticsService";

const chatSchema = z.object({
  model: z.string(),
  messages: z
    .array(
      z.object({
        role: z.enum(["system", "user", "assistant"]),
        content: z.string(),
      })
    )
    .min(1),
  temperature: z.number().min(0).max(2).optional(),
  max_tokens: z.number().min(1).max(4096).optional(),
});

export class InferenceController {
  private modelService = new DeployedModelService();
  private analyticsService = new AnalyticsService();

  chat = async (req: Request, res: Response) => {
    try {
      const apiKey = (req as any).apiKey;
      const parsed = chatSchema.parse(req.body) as ChatRequest;

      const deployedModel = await this.modelService.findByIdOrName(
        apiKey.organizationId,
        parsed.model
      );

      let providerName: string;
      let providerModelId: string;

      if (deployedModel) {
        providerName = deployedModel.provider;
        providerModelId = deployedModel.providerModelId;
      } else {
        const modelConfig = resolveModel(parsed.model);
        if (!modelConfig) {
          return res.status(400).json({
            error: `Unknown model: ${parsed.model}. Please deploy it first.`,
          });
        }
        providerName = modelConfig.provider;
        providerModelId = modelConfig.providerModelId;
      }

      const provider = getProvider(providerName);
      if (!provider) {
        return res.status(500).json({
          error: `Provider ${providerName} not configured`,
        });
      }

      console.log("[REQUEST]", {
        org: apiKey.organization.name,
        model: parsed.model,
        provider: providerName,
      });

      const result = await provider.chat(parsed, providerModelId);

      const inputContent = parsed.messages.map((m) => m.content).join(" ");
      const outputContent = result.choices[0].message.content;
      const estimatedTokens = Math.ceil(
        (inputContent.length + outputContent.length) / 3
      );

      if (deployedModel) {
        await this.analyticsService.trackUsage({
          apiKeyId: apiKey.id,
          deployedModelId: deployedModel.id,
          tokensUsed: estimatedTokens,
        });
      }

      res.json(result);
    } catch (err: any) {
      console.error("Error in /v1/chat/completions:", err);
      if (err.name === "ZodError") {
        return res.status(400).json({
          error: "Invalid request body",
          details: err.errors,
        });
      }
      res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    }
  };
}


