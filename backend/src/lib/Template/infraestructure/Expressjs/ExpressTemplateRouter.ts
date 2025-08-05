import multer from "multer";

import { Router } from "express";

import { ExpressTemplateController } from "./ExpressTemplateController";
import { authMiddleware } from "../../../Auth/infraestructure/middleware/authMiddleware/authMiddleware";

const controller = new ExpressTemplateController();
const ExpressTemplateRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

ExpressTemplateRouter.post(
  "/upload",
  authMiddleware,
  upload.single("templateFile"),
  controller.create
);
ExpressTemplateRouter.get("/", authMiddleware, controller.getAll);

ExpressTemplateRouter.get(
  "/:templateId/variables",
  authMiddleware,
  controller.extractVariables
);

ExpressTemplateRouter.delete(
  "/:templateId",
  authMiddleware,
  controller.delete
);

ExpressTemplateRouter.post(
  "/generate",
  authMiddleware,
  controller.generateDocx
);

export { ExpressTemplateRouter };
