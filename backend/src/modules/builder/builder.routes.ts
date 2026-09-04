import { Router } from "express";
import { ProjectController } from "./builder.controller.js";
import { jwtMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new ProjectController();

router.get("/", jwtMiddleware, controller.getAll);
router.get("/:id", jwtMiddleware, controller.getById);
router.post("/", jwtMiddleware, controller.create);
router.put("/:id", jwtMiddleware, controller.update);
router.delete("/:id", jwtMiddleware, controller.delete);

export default router;
