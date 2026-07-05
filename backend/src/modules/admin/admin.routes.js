import { Router } from "express";
import * as controller from "./admin.controller.js";

const router = Router();

router.get("/dashboard", controller.getDashboard);
router.get("/audit", controller.getAuditLogs);
router.get("/events", controller.getSecurityEvents);

export default router;
