import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import { loginUserSchema } from "../schemas/user.schema.js";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não configurado no .env");
}

router.post("/auth/login", async (req, res) => {
  try {
    const result = loginUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Dados inválidos",
        details: result.error.issues.map((issue) => issue.message),
      });
    }

    const { email, password } = result.data;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      return res.status(401).json({
        error: "Email ou senha inválidos",
      });
    }

    if (!user.password) {
      return res.status(401).json({
        error: "Email ou senha inválidos",
      });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        error: "Email ou senha inválidos",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res.json({
      message: "Login realizado com sucesso",
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao realizar login",
    });
  }
});

export default router;
