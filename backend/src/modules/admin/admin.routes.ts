import { Router } from "express";
import * as controllers from "./admin.controller.js";

const router = Router();

router.get("/dashboard", controllers.getDashboard);
router.get("/audit", controllers.getAuditLogs);
router.get("/events", controllers.getSecurityEvents);

export default router;
