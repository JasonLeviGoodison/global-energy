import type { Request, Response, RequestHandler } from "express";
import type { WithAuthProp } from "@clerk/clerk-sdk-node";

type AuthenticatedHandler = (req: WithAuthProp<Request>, res: Response) => any;

export function withClerkAuth(handler: AuthenticatedHandler): RequestHandler {
  return handler as unknown as RequestHandler;
}
