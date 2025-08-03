// import multer from "multer";

import { Router } from "express";

import { ExpressAuthController } from "./ExpressAuthController";

// import { authAdminMiddleware } from "../middleware/authAdminMiddleware";
// import { roleAuthMiddleware } from "../middleware/authMiddleware/roleAuthMiddleware";
import { authMiddleware } from "../middleware/authMiddleware/authMiddleware";

const controller = new ExpressAuthController();
const ExpressAuthRouter = Router();

// const upload = multer({ storage: multer.memoryStorage() }); // Carpeta temporal
// const uploadDisk = multer({ dest: "uploads/" });
 
ExpressAuthRouter.post("/register", controller.register);
// ExpressAuthRouter.post(
//   "/registeradmin",
//   authMiddleware,
//   authAdminMiddleware,
//   controller.registerAdmin
// );
ExpressAuthRouter.post("/login", controller.login);

ExpressAuthRouter.get("/protected", authMiddleware, controller.protectedRoute);
// ExpressAuthRouter.get(
//   "/admin",
//   authMiddleware,
//   authAdminMiddleware,
//   controller.adminRoute
// );
ExpressAuthRouter.post("/logout", controller.logout);

export { ExpressAuthRouter };
