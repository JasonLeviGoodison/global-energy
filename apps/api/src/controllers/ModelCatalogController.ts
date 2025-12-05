import { Request, Response } from "express";
import { MODEL_CATALOG } from "../config/models";

export class ModelCatalogController {
  getCatalog = async (_req: Request, res: Response) => {
    res.json(MODEL_CATALOG);
  };
}
