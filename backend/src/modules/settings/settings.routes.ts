import { Router } from "express";
import { SettingsController } from "./settings.controller.js";

const router = Router();
const controller = new SettingsController();

router.get("/", controller.getAll);
router.get("/:key", controller.getByKey);
router.post("/", controller.create);
router.put("/:id", controller.update);

export default router;
