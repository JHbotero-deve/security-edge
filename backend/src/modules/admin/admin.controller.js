import {
  getDashboardStatsService,
  getAuditLogsService,
  getSecurityEventsService,
} from "./admin.services.js";
import { auditLogFilterSchema, securityEventFilterSchema } from "../../schemas/validation.schemas.js";
import { successResponse, paginatedResponse } from "../../utils/response.js";
import { HTTP_STATUS, MESSAGES } from "../../constants/http-status.js";
import logger from "../../utils/logger.js";

/**
 * Get dashboard controller
 * GET /admin/dashboard
 */
export async function getDashboardController(req, res, next) {
  try {
    const stats = await getDashboardStatsService();
    return res
      .status(HTTP_STATUS.OK)
      .json(successResponse(stats, "Dashboard statistics"));
  } catch (error) {
    next(error);
  }
}

/**
 * Get audit logs controller
 * GET /admin/audit-logs
 */
export async function getAuditLogsController(req, res, next) {
  try {
    const filters = auditLogFilterSchema.parse(req.query);
    const { logs, total } = await getAuditLogsService(filters);

    return res.status(HTTP_STATUS.OK).json(
      paginatedResponse(logs, filters.page, filters.limit, total, MESSAGES.SUCCESS)
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Get security events controller
 * GET /admin/security-events
 */
export async function getSecurityEventsController(req, res, next) {
  try {
    const filters = securityEventFilterSchema.parse(req.query);
    const { events, total } = await getSecurityEventsService(filters);

    return res.status(HTTP_STATUS.OK).json(
      paginatedResponse(events, filters.page, filters.limit, total, MESSAGES.SUCCESS)
    );
  } catch (error) {
    next(error);
  }
}