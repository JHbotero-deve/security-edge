import { z } from "zod";

export const createSettingSchema = z.object({
  body: z.object({
    key: z.string().min(2).max(100),
    value: z.string().min(1),
  }),
});

export const updateSettingSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    value: z.string().min(1),
  }),
});

export const getSettingByKeySchema = z.object({
  params: z.object({
    key: z.string().min(2),
  }),
});