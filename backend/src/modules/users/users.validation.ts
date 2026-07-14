import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  role: z.string().optional(),
});

export const updateUserSchema = createUserSchema.partial();