import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(2, "O título deve ter pelo menos 2 caracteres")
    .max(200, "O título deve ter no máximo 200 caracteres"),

  description: z
    .string()
    .max(1000, "A descrição deve ter no máximo 1000 caracteres")
    .optional(),

  assigneeId: z.number().int().positive().nullable().optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(2, "O título deve ter pelo menos 2 caracteres")
    .max(200, "O título deve ter no máximo 200 caracteres")
    .optional(),

  description: z
    .string()
    .max(1000, "A descrição deve ter no máximo 1000 caracteres")
    .nullable()
    .optional(),

  status: z.enum(["TODO", "IN_PROGRESS", "DONE"]).optional(),

  assigneeId: z.number().int().positive().nullable().optional(),
});
