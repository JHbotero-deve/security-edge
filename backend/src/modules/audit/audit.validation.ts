import { z } from "zod";

export const auditLogFilterSchema = z.object({
  query: z.object({
    userId: z.coerce.number().int().optional(),
    action: z.string().optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
});

