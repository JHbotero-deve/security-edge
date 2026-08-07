import { z } from "zod";

export const dashboardSchema = z.object({});

export const auditLogFilterSchema = z.object({
  userId: z.coerce.number().int().optional(),
  action: z.string().optional(),
});

export const securityEventFilterSchema = z.object({
  status: z.string().optional(),
  severity: z.string().optional(),
});
