import { Router } from "express";
import { SettingController } from "./settings.controller";

const router = Router();
const controller = new SettingController();

router.get("/", controller.getAll);
router.get("/key/:key", controller.getByKey);
router.post("/", controller.create);
router.put("/:id", controller.update);

export default router;