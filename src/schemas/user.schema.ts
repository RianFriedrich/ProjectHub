import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),

  email: z.string().email("Email inválido"),

  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres"),
});

export const loginUserSchema = z.object({
  email: z.string().email("Email inválido"),

  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});
