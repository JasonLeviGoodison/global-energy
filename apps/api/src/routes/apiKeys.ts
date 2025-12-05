import { Router } from "express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { withClerkAuth } from "../utils/clerkHelpers";
import { ApiKeyController } from "../controllers/ApiKeyController";

const router = Router();
const controller = new ApiKeyController();

router.get("/", ClerkExpressWithAuth(), withClerkAuth(controller.getAll));
router.post("/", ClerkExpressWithAuth(), withClerkAuth(controller.create));

export default router;
