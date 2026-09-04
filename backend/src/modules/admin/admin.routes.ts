import { Router } from "express";
import { AdminController } from "./admin.controller.js";
import { jwtMiddleware, roleMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();
const controller = new AdminController();

router.use(jwtMiddleware, roleMiddleware(["ADMIN"]));

router.get("/dashboard", controller.getDashboard);
router.get("/audit", controller.getAuditLogs);
router.get("/events", controller.getSecurityEvents);

export default router;
