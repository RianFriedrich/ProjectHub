import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET ?? (() => {
    throw new Error("JWT_SECRET não configurado no .env");
})();

export interface AuthRequest extends Request {
    userId?: number;
}

export function authenticateToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            error: "Token não fornecido",
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as unknown as {
            userId: number;
            email: string;
        };

        req.userId = decoded.userId;

        next();
    } catch {
        return res.status(403).json({
            error: "Token inválido ou expirado",
        });
    }
}