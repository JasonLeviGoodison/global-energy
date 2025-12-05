import { Request, Response, NextFunction } from "express";
import { ApiKeyService } from "../services/ApiKeyService";

const apiKeyService = new ApiKeyService();

export async function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Missing or invalid Authorization header",
    });
  }

  const token = authHeader.slice("Bearer ".length);

  try {
    const apiKey = await apiKeyService.validateKey(token);

    if (!apiKey) {
      return res.status(403).json({ error: "Invalid or inactive API key" });
    }

    (req as any).apiKey = apiKey;
    next();
  } catch (error) {
    console.error("API Key validation error:", error);
    res.status(500).json({ error: "Internal server error during auth" });
  }
}


