import { z } from "zod";

export const getNotificationsFilterSchema = z.object({
  query: z.object({
    read: z.enum(["true", "false"]).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
});

export const createNotificationSchema = z.object({
  body: z.object({
    userId: z.number().int().positive(),
    title: z.string().min(3).max(100),
    message: z.string().min(5),
  }),
});

export const getNotificationByIdSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
});

export const updateNotificationStatusSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    read: z.boolean(),
  }),
});
