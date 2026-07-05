import { z } from "zod";

/**
 * Dashboard
 */
export const dashboardSchema = z.object({});

/**
 * Filtros para auditoría
 */
export const auditLogFilterSchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  userId: z.string().uuid().optional(),

  action: z.string().trim().max(100).optional(),

  resource: z.string().trim().max(100).optional(),

  status: z.enum(["SUCCESS", "FAILED", "WARNING"]).optional(),
});

/**
 * Filtros para eventos de seguridad
 */
export const securityEventFilterSchema = z.object({
  page: z.coerce.number().int().positive().default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  eventType: z
    .enum([
      "LOGIN",
      "LOGOUT",
      "FAILED_LOGIN",
      "PASSWORD_CHANGE",
      "TOKEN_REFRESH",
      "ACCESS_DENIED",
      "SUSPICIOUS_ACTIVITY",
      "OTHER",
    ])
    .optional(),

  severity: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).optional(),

  resolved: z.coerce.boolean().optional(),
});
