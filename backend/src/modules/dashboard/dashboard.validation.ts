import { z } from "zod";

export const dashboardFilterSchema = z.object({
  timeframe: z.string().optional(),
  type: z.string().optional(),
});

