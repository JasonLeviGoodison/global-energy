import { Router } from "express";
import organizationsRouter from "./organizations";
import apiKeysRouter from "./apiKeys";
import modelsRouter from "./models";
import modelCatalogRouter from "./modelCatalog";
import analyticsRouter from "./analytics";
import inferenceRouter from "./inference";
import clustersRouter from "./clusters";

const router = Router();

router.use("/organizations", organizationsRouter);
router.use("/api-keys", apiKeysRouter);
router.use("/models/catalog", modelCatalogRouter);
router.use("/models", modelsRouter);
router.use("/analytics", analyticsRouter);
router.use("/clusters", clustersRouter);
router.use("/v1", inferenceRouter);

export default router;
