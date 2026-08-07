import { Router } from "express";
import { AdminController } from "./admin.controller.js";

const router = Router();
const controller = new AdminController();

router.get("/dashboard", controller.getDashboard);
router.get("/audit", controller.getAuditLogs);
router.get("/events", controller.getSecurityEvents);

export default router;
