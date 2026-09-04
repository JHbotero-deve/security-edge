import { Router } from "express";
import { NotificationController } from "./notifications.controller.js";
import { jwtMiddleware, roleMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new NotificationController();

router.get("/me", jwtMiddleware, controller.getMyNotifications);
router.post("/", jwtMiddleware, roleMiddleware(["ADMIN", "SYSTEM"]), controller.create);
router.patch("/:id/status", jwtMiddleware, controller.updateStatus);
router.delete("/:id", jwtMiddleware, controller.delete);

export default router;

