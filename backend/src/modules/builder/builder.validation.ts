import { z } from "zod";

export const getProjectsFilterSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
});

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    themeColor: z.string().optional(),
    canvasBg: z.string().optional(),
    pages: z.record(z.any()),
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
  body: z.object({
    name: z.string().min(1).max(255).optional(),
    themeColor: z.string().optional(),
    canvasBg: z.string().optional(),
    pages: z.record(z.any()).optional(),
  }),
});

export const getProjectByIdSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val, 10)),
  }),
});
