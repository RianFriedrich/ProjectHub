import swaggerUi from "swagger-ui-express";

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "ProjectHub API",
    version: "1.0.0",
    description: "API REST para gerenciamento de projetos e tarefas.",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Autenticação de usuários",
    },
    {
      name: "Projects",
      description: "Gerenciamento de projetos",
    },
    {
      name: "Tasks",
      description: "Gerenciamento de tarefas",
    },
    {
      name: "Users",
      description: "Gerenciamento de usuários",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/users": {
      post: {
        tags: ["Users"],
        summary: "Criar usuário",
        description: "Cria um novo usuário no ProjectHub.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: {
                    type: "string",
                    example: "Rian",
                  },
                  email: {
                    type: "string",
                    format: "email",
                    example: "rian@teste.com",
                  },
                  password: {
                    type: "string",
                    format: "password",
                    example: "12345678",
                  },
                },
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Usuário criado com sucesso",
          },
          "400": {
            description: "Dados inválidos",
          },
        },
      },

      get: {
        tags: ["Users"],
        summary: "Listar usuários",
        description: "Lista os usuários autenticados sem retornar suas senhas.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          "200": {
            description: "Usuários encontrados",
          },
          "401": {
            description: "Token inválido ou ausente",
          },
        },
      },
    },

    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login",
        description: "Autentica um usuário e retorna um JWT.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    format: "email",
                    example: "teste2@projecthub.com",
                  },
                  password: {
                    type: "string",
                    format: "password",
                    example: "Teste123456",
                  },
                },
              },
            },
          },
        },

        responses: {
          "200": {
            description: "Login realizado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Login realizado com sucesso",
                    },
                    token: {
                      type: "string",
                      example: "eyJhbGciOiJIUzI1NiIs...",
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Dados inválidos",
          },
          "401": {
            description: "Email ou senha inválidos",
          },
        },
      },
    },

    "/projects": {
      post: {
        tags: ["Projects"],
        summary: "Criar projeto",
        description: "Cria um novo projeto para o usuário autenticado.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: {
                    type: "string",
                    example: "Sistema E-commerce",
                  },
                  description: {
                    type: "string",
                    example: "Projeto para gerenciamento de uma loja online",
                  },
                },
              },
            },
          },
        },

        responses: {
          "201": {
            description: "Projeto criado com sucesso",
          },
          "400": {
            description: "Dados inválidos",
          },
          "401": {
            description: "Token inválido ou ausente",
          },
        },
      },
      get: {
        tags: ["Projects"],
        summary: "Listar projetos",
        description: "Lista os projetos do usuário autenticado.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "page",
            in: "query",
            required: false,
            description: "Número da página",
            schema: {
              type: "integer",
              minimum: 1,
              default: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "Quantidade de projetos por página",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 50,
              default: 10,
            },
          },
          {
            name: "search",
            in: "query",
            required: false,
            description: "Pesquisa projetos pelo nome",
            schema: {
              type: "string",
              example: "teste",
            },
          },
        ],

        responses: {
          "200": {
            description: "Lista de projetos",
          },
          "401": {
            description: "Token inválido ou ausente",
          },
        },
      },
    },

    "/projects/{id}": {
      get: {
        tags: ["Projects"],
        summary: "Buscar projeto por ID",
        description: "Retorna um projeto específico do usuário autenticado.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do projeto",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],

        responses: {
          "200": {
            description: "Projeto encontrado",
          },
          "401": {
            description: "Token inválido ou ausente",
          },
          "404": {
            description: "Projeto não encontrado",
          },
        },
      },

      put: {
        tags: ["Projects"],
        summary: "Atualizar projeto",
        description: "Atualiza um projeto do usuário autenticado.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do projeto",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "ProjectHub 2.0",
                  },
                  description: {
                    type: "string",
                    example: "API atualizada do ProjectHub",
                  },
                },
              },
            },
          },
        },

        responses: {
          "200": {
            description: "Projeto atualizado com sucesso",
          },
          "400": {
            description: "Dados inválidos",
          },
          "401": {
            description: "Token inválido ou ausente",
          },
          "404": {
            description: "Projeto não encontrado",
          },
        },
      },

      delete: {
        tags: ["Projects"],
        summary: "Excluir projeto",
        description: "Exclui um projeto do usuário autenticado.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID do projeto",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],

        responses: {
          "204": {
            description: "Projeto excluído com sucesso",
          },
          "401": {
            description: "Token inválido ou ausente",
          },
          "404": {
            description: "Projeto não encontrado",
          },
        },
      },
    },

    "/projects/{projectId}/tasks": {
      post: {
        tags: ["Tasks"],
        summary: "Criar tarefa",
        description:
          "Cria uma tarefa dentro de um projeto do usuário autenticado.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "projectId",
            in: "path",
            required: true,
            description: "ID do projeto",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title"],
                properties: {
                  title: {
                    type: "string",
                    example: "Implementar sistema de login",
                  },
                  description: {
                    type: "string",
                    example: "Criar autenticação utilizando JWT",
                  },
                  assigneeId: {
                    type: "integer",
                    nullable: true,
                    example: 1,
                  },
                },
              },
            },
          },
        },

        responses: {
          "201": {
            description: "Tarefa criada com sucesso",
          },
          "400": {
            description: "Dados inválidos",
          },
          "401": {
            description: "Token inválido ou ausente",
          },
          "404": {
            description: "Projeto não encontrado",
          },
        },
      },

      get: {
        tags: ["Tasks"],
        summary: "Listar tarefas do projeto",
        description:
          "Lista todas as tarefas de um projeto do usuário autenticado.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "page",
            in: "query",
            required: false,
            description: "Número da página",
            schema: {
              type: "integer",
              minimum: 1,
              default: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            description: "Quantidade de projetos por página",
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 50,
              default: 10,
            },
          },
        ],

        responses: {
          "200": {
            description: "Lista de tarefas",
          },
          "401": {
            description: "Token inválido ou ausente",
          },
          "404": {
            description: "Projeto não encontrado",
          },
        },
      },
    },

    "/tasks/{id}": {
      get: {
        tags: ["Tasks"],
        summary: "Buscar tarefa por ID",
        description: "Retorna uma tarefa específica.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "projectId",
            in: "path",
            required: true,
            description: "ID do projeto",
            schema: {
              type: "integer",
              example: 1,
            },
          },
          {
            name: "status",
            in: "query",
            required: false,
            description: "Filtra tarefas pelo status",
            schema: {
              type: "string",
              enum: ["TODO", "IN_PROGRESS", "DONE"],
            },
          },
        ],

        responses: {
          "200": {
            description: "Tarefa encontrada",
          },
          "401": {
            description: "Token inválido ou ausente",
          },
          "404": {
            description: "Tarefa não encontrada",
          },
        },
      },

      put: {
        tags: ["Tasks"],
        summary: "Atualizar tarefa",
        description: "Atualiza uma tarefa existente.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID da tarefa",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                    example: "Implementar autenticação JWT",
                  },
                  description: {
                    type: "string",
                    example: "Finalizar autenticação e autorização.",
                  },
                  status: {
                    type: "string",
                    enum: ["TODO", "IN_PROGRESS", "DONE"],
                    example: "IN_PROGRESS",
                  },
                  assigneeId: {
                    type: "integer",
                    nullable: true,
                    example: 1,
                  },
                },
              },
            },
          },
        },

        responses: {
          "200": {
            description: "Tarefa atualizada com sucesso",
          },
          "400": {
            description: "Dados inválidos",
          },
          "401": {
            description: "Token inválido ou ausente",
          },
          "404": {
            description: "Tarefa não encontrada",
          },
        },
      },

      delete: {
        tags: ["Tasks"],
        summary: "Excluir tarefa",
        description: "Exclui uma tarefa existente.",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID da tarefa",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],

        responses: {
          "204": {
            description: "Tarefa excluída com sucesso",
          },
          "401": {
            description: "Token inválido ou ausente",
          },
          "404": {
            description: "Tarefa não encontrada",
          },
        },
      },
    },
  },
};

export { swaggerUi };
