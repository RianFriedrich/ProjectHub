# ProjectHub Frontend

Frontend empresarial do ProjectHub, integrado à API Node.js + TypeScript + Express.

## Stack

- React + TypeScript
- Vite
- React Router
- Axios
- CSS customizado, sem framework visual

## Rodar localmente

Com o backend ProjectHub rodando na porta `3000`:

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`.

O Vite encaminha `/api/*` para `http://localhost:3000/*`, então o desenvolvimento local não depende de CORS.

## Funcionalidades

- Login JWT
- Login Microsoft/Entra ID via backend
- Dashboard executivo
- CRUD de projetos
- Consulta e gestão de tarefas
- Usuários
- REST Console para chamadas GET/POST/PUT/PATCH/DELETE
- Swagger/API Docs
- Painel técnico de Neon, Docker, Kubernetes, GitHub Actions e Azure
- Layout responsivo

## Importante

O frontend não armazena `DATABASE_URL`, `JWT_SECRET` ou segredos Azure. Tudo isso permanece no backend/secrets.
