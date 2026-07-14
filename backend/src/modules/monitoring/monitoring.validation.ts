import { z } from "zod";

export const monitoringFilterSchema = z.object({
  status: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});