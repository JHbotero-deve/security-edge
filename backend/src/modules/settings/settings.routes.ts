import { Router } from "express";
import { SettingsController } from "./settings.controller.js";
import { jwtMiddleware, roleMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new SettingsController();

router.get("/", jwtMiddleware, roleMiddleware(["ADMIN"]), controller.getAll);
router.get("/:key", jwtMiddleware, roleMiddleware(["ADMIN"]), controller.getByKey);
router.post("/", jwtMiddleware, roleMiddleware(["ADMIN"]), controller.create);
router.put("/:id", jwtMiddleware, roleMiddleware(["ADMIN"]), controller.update);

export default router;
