import { Router } from "express";
import { MonitoringController } from "./monitoring.controller.js";

const router = Router();
const controller = new MonitoringController();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);

export default router;
