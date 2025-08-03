import multer from "multer";

import { Router } from "express";

import { ExpressTemplateGeneratorController } from "./ExpressTemplateGeneratorController";
import { authMiddleware } from "../../../Auth/infraestructure/middleware/authMiddleware/authMiddleware";

const controller = new ExpressTemplateGeneratorController();
const ExpressTemplateGeneratorRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

ExpressTemplateGeneratorRouter.post(
  "/upload",
  authMiddleware,
  upload.single("templateFile"),
  controller.create
);
ExpressTemplateGeneratorRouter.get("/", authMiddleware, controller.getAll);

ExpressTemplateGeneratorRouter.get(
  "/:templateId/variables",
  authMiddleware,
  controller.extractVariables
);

ExpressTemplateGeneratorRouter.delete(
  "/:templateId",
  authMiddleware,
  controller.delete
);

ExpressTemplateGeneratorRouter.post(
  "/generate",
  authMiddleware,
  controller.generateDocx
);

export { ExpressTemplateGeneratorRouter };
