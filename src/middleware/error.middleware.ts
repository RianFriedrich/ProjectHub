import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorMiddleware(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(error);

    // Erros de validação do Zod
    if (error instanceof ZodError) {
        return res.status(400).json({
            error: "Dados inválidos",
            details: error.issues.map((issue) => issue.message),
        });
    }

    // Erro desconhecido
    return res.status(500).json({
        error: "Erro interno do servidor",
    });
}