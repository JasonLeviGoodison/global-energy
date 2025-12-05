import { Router } from "express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { withClerkAuth } from "../utils/clerkHelpers";
import { AnalyticsController } from "../controllers/AnalyticsController";

const router = Router();
const controller = new AnalyticsController();

router.get("/", ClerkExpressWithAuth(), withClerkAuth(controller.getAnalytics));
router.get("/overview", ClerkExpressWithAuth(), withClerkAuth(controller.getOverview));
router.get("/models/:modelId", ClerkExpressWithAuth(), withClerkAuth(controller.getModelAnalytics));

export default router;
