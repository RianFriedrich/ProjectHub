import express from "express";
import { prisma } from "./lib/prisma.js";
import usersRouter from "./routes/users.routes.js";
import authRouter from "./routes/auth.routes.js";
import { authenticateToken } from "./middleware/auth.middleware.js";
import type { AuthRequest } from "./middleware/auth.middleware.js";
import projectsRouter from "./routes/projects.routes.js";
import tasksRouter from "./routes/tasks.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { swaggerSpec, swaggerUi } from "./docs/swagger.js";

const app = express();

app.use(express.json());
app.use(authRouter);
app.use(tasksRouter);
app.use(projectsRouter);
app.use(usersRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.json({
    message: "ProjectHub API funcionando!",
  });
});

app.get("/users", authenticateToken, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao buscar usuários",
    });
  }
});

app.get("/protected", authenticateToken, (req: AuthRequest, res) => {
  res.json({
    message: "Você acessou uma rota protegida!",
    userId: req.userId,
  });
});

export default app;
