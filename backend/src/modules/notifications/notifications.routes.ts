import { Router } from "express";
import { NotificationController } from "./notifications.controller";

const router = Router();
const controller = new NotificationController();

router.get("/user/:userId", controller.getByUser);
router.post("/", controller.create);
router.patch("/:id/status", controller.updateStatus);
router.delete("/:id", controller.delete);

export default router;