import { Router } from "express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import { withClerkAuth } from "../utils/clerkHelpers";
import { ClusterController } from "../controllers/ClusterController";

const router = Router();
const controller = new ClusterController();

router.get("/options", controller.getOptions);
router.get("/", ClerkExpressWithAuth(), withClerkAuth(controller.getAll));
router.get("/:id", ClerkExpressWithAuth(), withClerkAuth(controller.getById));
router.get("/:id/kubeconfig", ClerkExpressWithAuth(), withClerkAuth(controller.getKubeconfig));
router.post("/", ClerkExpressWithAuth(), withClerkAuth(controller.create));
router.delete("/:id", ClerkExpressWithAuth(), withClerkAuth(controller.delete));

export default router;



