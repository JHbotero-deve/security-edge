import { z } from "zod";

export const createIncidentSchema = z.object({
  title: z.string().min(2, "El título es obligatorio"),
  description: z.string().min(5, "La descripción es obligatoria"),
  severity: z.string().min(1, "La severidad es obligatoria"),
  status: z.string().optional(),
});

export const updateIncidentSchema = createIncidentSchema.partial();

