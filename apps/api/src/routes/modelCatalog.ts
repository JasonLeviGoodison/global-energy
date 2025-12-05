import { Router } from "express";
import { ModelCatalogController } from "../controllers/ModelCatalogController";

const router = Router();
const controller = new ModelCatalogController();

router.get("/", controller.getCatalog);

export default router;
