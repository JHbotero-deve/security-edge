import { Router } from "express";
import { AlertController } from "./alerts.controller.js";
import { jwtMiddleware, roleMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new AlertController();

router.get("/", jwtMiddleware, roleMiddleware(["ADMIN", "OPERATOR"]), controller.getAll);
router.get("/:id", jwtMiddleware, roleMiddleware(["ADMIN", "OPERATOR"]), controller.getById);

export default router;
