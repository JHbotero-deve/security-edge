import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    username: z.string().min(3).max(50).optional(),
    email: z.string().email().optional(),
  }),
});

export const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
});