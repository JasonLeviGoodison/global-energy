import { Router } from "express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { withClerkAuth } from "../utils/clerkHelpers";
import { OrganizationController } from "../controllers/OrganizationController";

const router = Router();
const controller = new OrganizationController();

router.get("/me", ClerkExpressWithAuth(), withClerkAuth(controller.getMe));

export default router;
