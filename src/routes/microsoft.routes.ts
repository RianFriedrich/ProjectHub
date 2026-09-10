import { Router } from "express";
import { ConfidentialClientApplication } from "@azure/msal-node";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { prisma } from "../lib/prisma.js";

const router = Router();
const JWT_SECRET: string =
  process.env.JWT_SECRET ??
  (() => {
    throw new Error("JWT_SECRET não configurado no .env");
  })();

const msalClient = new ConfidentialClientApplication({
  auth: {
    clientId: process.env.MICROSOFT_CLIENT_ID!,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}`,
  },
});

router.get("/auth/microsoft", async (req, res) => {
  const authUrl = await msalClient.getAuthCodeUrl({
    scopes: ["User.Read"],
    redirectUri: "http://localhost:3000/auth/microsoft/callback",
  });

  res.redirect(authUrl);
});

router.get("/auth/microsoft/callback", async (req, res) => {
  try {
    const code = String(req.query.code);

    const result = await msalClient.acquireTokenByCode({
      code,
      scopes: ["User.Read"],
      redirectUri: "http://localhost:3000/auth/microsoft/callback",
    });

    const displayName = result.account?.name;
    const email = result.account?.username;

    if (!displayName || !email) {
      return res.status(400).json({
        error: "Não foi possível obter os dados do usuário Microsoft",
      });
    }

    const normalizedEmail = email.toLowerCase();

    let user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: displayName,
          email: normalizedEmail,
          password: await bcrypt.hash(randomUUID(), 10),
        },
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
      message: "Login Microsoft realizado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao realizar login com Microsoft",
    });
  }
});

export default router;
