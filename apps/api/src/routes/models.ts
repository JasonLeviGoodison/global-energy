import { Router } from "express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { withClerkAuth } from "../utils/clerkHelpers";
import { DeployedModelController } from "../controllers/DeployedModelController";

const router = Router();
const controller = new DeployedModelController();

router.get("/", ClerkExpressWithAuth(), withClerkAuth(controller.getAll));
router.post("/", ClerkExpressWithAuth(), withClerkAuth(controller.create));

export default router;
