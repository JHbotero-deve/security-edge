import { z } from "zod";

export const auditLogFilterSchema = z.object({
  userId: z.string().optional(),
  action: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
