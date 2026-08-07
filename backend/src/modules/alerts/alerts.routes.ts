import { Router } from "express";
import { AlertController } from "./alerts.controller.js";

const router = Router();
const controller = new AlertController();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);

export default router;
