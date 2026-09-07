import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("ProjectHub API", () => {
  it("deve retornar que a API está funcionando", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("ProjectHub API funcionando!");
  });

  it("deve bloquear acesso sem JWT", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(401);
  });

  it("deve permitir acesso com JWT válido", async () => {
    const login = await request(app).post("/auth/login").send({
      email: "teste2@projecthub.com",
      password: "Teste123456",
    });

    expect(login.status).toBe(200);

    const token = login.body.token;

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
  it("deve rejeitar senha incorreta", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "teste2@projecthub.com",
      password: "senha-errada",
    });

    expect(response.status).toBe(401);
  });
  it("deve bloquear criação de projeto sem JWT", async () => {
    const response = await request(app).post("/projects").send({
      name: "Projeto sem autorização",
      description: "Teste",
    });

    expect(response.status).toBe(401);
  });
  it("deve permitir criar projeto com JWT válido", async () => {
    const login = await request(app).post("/auth/login").send({
      email: "teste2@projecthub.com",
      password: "Teste123456",
    });

    expect(login.status).toBe(200);

    const token = login.body.token;

    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Projeto de teste",
        description: "Projeto criado pelo teste automatizado",
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Projeto de teste");
  });
  it("deve bloquear criação de tarefa sem JWT", async () => {
    const response = await request(app).post("/projects/1/tasks").send({
      title: "Tarefa sem autorização",
      description: "Teste",
    });

    expect(response.status).toBe(401);
  });
  it("deve permitir criar tarefa com JWT válido", async () => {
    const login = await request(app).post("/auth/login").send({
      email: "teste2@projecthub.com",
      password: "Teste123456",
    });

    expect(login.status).toBe(200);

    const token = login.body.token;

    const project = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Projeto para teste de Task",
        description: "Projeto criado pelo teste",
      });

    expect(project.status).toBe(201);

    const response = await request(app)
      .post(`/projects/${project.body.id}/tasks`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Criar teste automatizado",
        description: "Testar criação de tarefas",
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Criar teste automatizado");
  });
  it("não deve permitir acessar projeto de outro usuário", async () => {
    const userA = await request(app)
      .post("/users")
      .send({
        name: "Usuario A",
        email: `usuarioA${Date.now()}@test.com`,
        password: "Teste123456",
      });

    expect(userA.status).toBe(201);

    const loginA = await request(app).post("/auth/login").send({
      email: userA.body.email,
      password: "Teste123456",
    });

    expect(loginA.status).toBe(200);

    const tokenA = loginA.body.token;

    const projectA = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${tokenA}`)
      .send({
        name: "Projeto do Usuario A",
        description: "Projeto privado",
      });

    expect(projectA.status).toBe(201);

    const userB = await request(app)
      .post("/users")
      .send({
        name: "Usuario B",
        email: `usuarioB${Date.now()}@test.com`,
        password: "Teste123456",
      });

    expect(userB.status).toBe(201);

    const loginB = await request(app).post("/auth/login").send({
      email: userB.body.email,
      password: "Teste123456",
    });

    expect(loginB.status).toBe(200);

    const tokenB = loginB.body.token;

    const response = await request(app)
      .get(`/projects/${projectA.body.id}`)
      .set("Authorization", `Bearer ${tokenB}`);

    expect(response.status).toBe(404);
  });
  it("deve rejeitar dados inválidos ao criar projeto", async () => {
    const login = await request(app).post("/auth/login").send({
      email: "teste2@projecthub.com",
      password: "Teste123456",
    });

    expect(login.status).toBe(200);

    const token = login.body.token;

    const response = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
        description: "Projeto inválido",
      });

    expect(response.status).toBe(400);
  });
});
