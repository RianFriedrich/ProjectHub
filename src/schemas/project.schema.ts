import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(2, "O nome do projeto deve ter pelo menos 2 caracteres")
    .max(100, "O nome do projeto deve ter no máximo 100 caracteres"),

  description: z
    .string()
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .optional(),
});

export const updateProjectSchema = z.object({
  name: z
    .string()
    .min(2, "O nome do projeto deve ter pelo menos 2 caracteres")
    .max(100, "O nome do projeto deve ter no máximo 100 caracteres")
    .optional(),

  description: z
    .string()
    .max(500, "A descrição deve ter no máximo 500 caracteres")
    .nullable()
    .optional(),
});
