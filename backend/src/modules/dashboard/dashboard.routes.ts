import { Router } from "express";
import { DashboardController } from "./dashboard.controller.js";
import { jwtMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new DashboardController();

router.get("/", jwtMiddleware, controller.getMetrics);

export default router;
