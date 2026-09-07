import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/project.schema.js";

const router = Router();

router.post("/projects", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const result = createProjectSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Dados inválidos",
        details: result.error.issues.map((issue) => issue.message),
      });
    }

    const { name, description } = result.data;

    const project = await (prisma as any).project.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        ownerId: req.userId!,
      },
    });

    return res.status(201).json(project);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao criar projeto",
    });
  }
});


router.get("/projects", authenticateToken, async (req: AuthRequest, res) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 50);

    const skip = (page - 1) * limit;
    const search = String(req.query.search || "").trim();

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: {
          ownerId: req.userId!,
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),

      prisma.project.count({
        where: {
          ownerId: req.userId!,
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      }),
    ]);

    return res.json({
      data: projects,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      search,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Erro ao buscar projetos",
    });
  }
});

router.get(
  "/projects/:id",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const projectId = Number(req.params.id);

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

      return res.json(project);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Erro ao buscar projeto",
      });
    }
  },
);

router.put(
  "/projects/:id",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const projectId = Number(req.params.id);
      const result = updateProjectSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          error: "Dados inválidos",
          details: result.error.issues.map((issue) => issue.message),
        });
      }

      const { name, description } = result.data;

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

      const updatedProject = await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          name: name?.trim() || project.name,
          description:
            description !== undefined
              ? description?.trim() || null
              : project.description,
        },
      });

      return res.json(updatedProject);
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Erro ao atualizar projeto",
      });
    }
  },
);

router.delete(
  "/projects/:id",
  authenticateToken,
  async (req: AuthRequest, res) => {
    try {
      const projectId = Number(req.params.id);

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

      await prisma.project.delete({
        where: {
          id: projectId,
        },
      });

      return res.json({
        message: "Projeto deletado com sucesso",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        error: "Erro ao deletar projeto",
      });
    }
  },
);

export default router;
