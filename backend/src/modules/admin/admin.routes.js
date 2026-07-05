import { Router } from "express";
import {
  getDashboardController,
  getAuditLogsController,
  getSecurityEventsController,
} from "./admin.controller.js";
import { jwtMiddleware, roleMiddleware, activeUserMiddleware } from "../../middlewares/auth.middleware.js";
import { ROLES } from "../../constants/http-status.js";

const router = Router();

/**
 * Admin routes (ADMIN and ANALYST only)
 */
router.get(
  "/dashboard",
  jwtMiddleware,
  activeUserMiddleware,
  roleMiddleware([ROLES.ADMIN, ROLES.ANALYST]),
  getDashboardController
);

router.get(
  "/audit-logs",
  jwtMiddleware,
  activeUserMiddleware,
  roleMiddleware([ROLES.ADMIN, ROLES.ANALYST]),
  getAuditLogsController
);

router.get(
  "/security-events",
  jwtMiddleware,
  activeUserMiddleware,
  roleMiddleware([ROLES.ADMIN, ROLES.ANALYST]),
  getSecurityEventsController
);

export default router;