import { z } from "zod";

export const createPermissionSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(50),
  }),
});

export const updatePermissionSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    name: z.string().min(3).max(50),
  }),
});

export const getPermissionByIdSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
});