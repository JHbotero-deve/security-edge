import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "El nombre es obligatorio"),
    username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres").optional(),
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Correo electrónico inválido"),
    password: z.string().min(1, "La contraseña es obligatoria"),
  }),
});

