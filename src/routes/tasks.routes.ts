import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.post(
  "/projects/:projectId/tasks",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const projectId = Number(req.params.projectId);
      const result = createTaskSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: "Dados inválidos",
          details: result.error.issues.map((issue) => issue.message),
        });
      }

      const { title, description, assigneeId } = result.data;

      if (isNaN(projectId)) {
        return res.status(400).json({
          error: "ID do projeto inválido",
        });
      }

      if (!title || title.trim().length < 2) {
        return res.status(400).json({
          error: "O título da tarefa deve ter pelo menos 2 caracteres",
        });
      }

      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          ownerId: req.userId!,
        },
      });

      if (!project) {
        return res.status(404).json({
          error: "Projeto não encontrado",
        });
      }

      if (assigneeId !== undefined && assigneeId !== null) {
        const user = await prisma.user.findUnique({
          where: {
            id: Number(assigneeId),
          },
        });

        if (!user) {
          return res.status(404).json({
            error: "Usuário responsável não encontrado",
          });
        }
      }

      const task = await (prisma as any).task.create({
        data: {
          title: title.trim(),
          description: description?.trim() || null,
          projectId,
          assigneeId:
            assigneeId !== undefined && assigneeId !== null
              ? Number(assigneeId)
              : null,
        },
      });

      return res.status(201).json(task);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Erro ao criar tarefa",
      });
    }
  },
);

router.get(
  "/projects/:projectId/tasks",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const projectId = Number(req.params.projectId);
      const status = req.query.status as "TODO" | "IN_PROGRESS" | "DONE" | undefined;

      if (isNaN(projectId)) {
        return res.status(400).json({
          error: "ID do projeto inválido",
        });
      }

      const project = await prisma.project.findFirst({
        where: {
          id: projectId,
          ownerId: req.userId!,
        },
      });

      if (!project) {
        return res.status(404).json({
          error: "Projeto não encontrado",
        });
      }

      const tasks = await (prisma as any).task.findMany({
        where: {
          projectId,
          status: status || undefined,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.json(tasks);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Erro ao buscar tarefas",
      });
    }
  },
);

router.get("/tasks/:id", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const taskId = Number(req.params.id);

    if (isNaN(taskId)) {
      return res.status(400).json({
        error: "ID da tarefa inválido",
      });
    }

    const task = await (prisma as any).task.findFirst({
      where: {
        id: taskId,
        project: {
          ownerId: req.userId!,
        },
      },
    });

    if (!task) {
      return res.status(404).json({
        error: "Tarefa não encontrada",
      });
    }

    return res.json(task);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao buscar tarefa",
    });
  }
});

router.put("/tasks/:id", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const taskId = Number(req.params.id);
    const result = updateTaskSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Dados inválidos",
        details: result.error.issues.map((issue) => issue.message),
      });
    }

    const { title, description, status, assigneeId } = result.data;

    if (isNaN(taskId)) {
      return res.status(400).json({
        error: "ID da tarefa inválido",
      });
    }

    const task = await (prisma as any).task.findFirst({
      where: {
        id: taskId,
        project: {
          ownerId: req.userId!,
        },
      },
    });

    if (!task) {
      return res.status(404).json({
        error: "Tarefa não encontrada",
      });
    }

    const validStatuses = ["TODO", "IN_PROGRESS", "DONE"];

    if (status !== undefined && !validStatuses.includes(status)) {
      return res.status(400).json({
        error: "Status inválido",
      });
    }

    if (assigneeId !== undefined && assigneeId !== null) {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(assigneeId),
        },
      });

      if (!user) {
        return res.status(404).json({
          error: "Usuário responsável não encontrado",
        });
      }
    }

    const updatedTask = await (prisma as any).task.update({
      where: {
        id: taskId,
      },
      data: {
        title: title !== undefined ? title.trim() : task.title,

        description:
          description !== undefined
            ? description?.trim() || null
            : task.description,

        status: status !== undefined ? status : task.status,

        assigneeId:
          assigneeId !== undefined
            ? assigneeId === null
              ? null
              : Number(assigneeId)
            : task.assigneeId,
      },
    });

    return res.json(updatedTask);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao atualizar tarefa",
    });
  }
});

router.delete(
  "/tasks/:id",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const taskId = Number(req.params.id);

      if (isNaN(taskId)) {
        return res.status(400).json({
          error: "ID da tarefa inválido",
        });
      }

      const task = await (prisma as any).task.findFirst({
        where: {
          id: taskId,
          project: {
            ownerId: req.userId!,
          },
        },
      });

      if (!task) {
        return res.status(404).json({
          error: "Tarefa não encontrada",
        });
      }

      await (prisma as any).task.delete({
        where: {
          id: taskId,
        },
      });

      return res.json({
        message: "Tarefa deletada com sucesso",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Erro ao deletar tarefa",
      });
    }
  },
);

export default router;
