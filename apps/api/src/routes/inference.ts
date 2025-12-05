import { Router } from "express";
import { validateApiKey } from "../middleware/auth";
import { InferenceController } from "../controllers/InferenceController";

const router = Router();
const controller = new InferenceController();

router.post("/chat/completions", validateApiKey, controller.chat);

export default router;
