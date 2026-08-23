import { z } from "zod";

export const createRoleSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(50),
  }),
});

export const updateRoleSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    name: z.string().min(3).max(50),
  }),
});

export const getRoleByIdSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
});