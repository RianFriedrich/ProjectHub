# ProjectHub
# ProjectHub

API e aplicação web completa para gerenciamento de projetos e tarefas, desenvolvida como um projeto de aprendizado prático e de integração entre diferentes áreas do desenvolvimento de software.

O ProjectHub foi construído com a intenção de ir muito além de um CRUD simples. O projeto começou de forma incremental, partindo de uma API Node.js, passando pela modelagem e integração com PostgreSQL, autenticação, autorização, validação, documentação, testes, Docker, Kubernetes, CI/CD, integração com Microsoft Entra ID e, por fim, uma interface web completa para transformar a API em uma aplicação utilizável.

A proposta central do projeto foi combinar diversas ferramentas em uma única aplicação coerente, aprendendo na prática como essas tecnologias se conectam e como uma aplicação pode evoluir de um servidor local para uma solução com características próximas às encontradas em ambientes profissionais.

---

## Sumário

- [1. Visão geral](#1-visão-geral)
- [2. Objetivos do projeto](#2-objetivos-do-projeto)
- [3. O que o ProjectHub possui](#3-o-que-o-projecthub-possui)
- [4. Arquitetura geral](#4-arquitetura-geral)
- [5. Mapa de separação da aplicação](#5-mapa-de-separação-da-aplicação)
- [6. Mapa de desenvolvimento](#6-mapa-de-desenvolvimento)
- [7. Tecnologias utilizadas](#7-tecnologias-utilizadas)
- [8. Backend](#8-backend)
- [9. Banco de dados](#9-banco-de-dados)
- [10. Autenticação e segurança](#10-autenticação-e-segurança)
- [11. API e funcionalidades](#11-api-e-funcionalidades)
- [12. Validação e tratamento de erros](#12-validação-e-tratamento-de-erros)
- [13. Documentação com Swagger](#13-documentação-com-swagger)
- [14. Testes automatizados](#14-testes-automatizados)
- [15. Frontend](#15-frontend)
- [16. Docker](#16-docker)
- [17. Kubernetes](#17-kubernetes)
- [18. GitHub Actions e CI/CD](#18-github-actions-e-cicd)
- [19. Azure e Microsoft Entra ID](#19-azure-e-microsoft-entra-id)
- [20. Estrutura de diretórios](#20-estrutura-de-diretórios)
- [21. Como executar o projeto](#21-como-executar-o-projeto)
- [22. Variáveis de ambiente](#22-variáveis-de-ambiente)
- [23. Executando com Docker](#23-executando-com-docker)
- [24. Executando com Kubernetes](#24-executando-com-kubernetes)
- [25. Executando os testes](#25-executando-os-testes)
- [26. Fluxo de uso](#26-fluxo-de-uso)
- [27. Por que o projeto é robusto](#27-por-que-o-projeto-é-robusto)
- [28. Decisões de arquitetura](#28-decisões-de-arquitetura)
- [29. Melhorias futuras](#29-melhorias-futuras)
- [30. Conclusão](#30-conclusão)

---

## 1. Visão geral

O ProjectHub é uma aplicação de gerenciamento de projetos e tarefas baseada em uma API REST, banco de dados relacional e uma interface web moderna.

A aplicação permite autenticar usuários, criar projetos, criar e acompanhar tarefas, consultar dados, aplicar filtros e paginação, proteger recursos por usuário, documentar a API e executar operações diretamente pela interface.

A evolução do projeto também incorporou componentes de infraestrutura e engenharia de software:

- containerização com Docker;
- execução local com Kubernetes;
- pipeline automatizado com GitHub Actions;
- banco PostgreSQL hospedado no Neon;
- autenticação baseada em JWT;
- integração com Microsoft Entra ID;
- documentação OpenAPI/Swagger;
- testes automatizados com Vitest e Supertest;
- frontend React + TypeScript;
- painel técnico para visualizar a arquitetura de infraestrutura.

O resultado é um projeto único capaz de demonstrar conhecimentos de desenvolvimento backend, banco de dados, frontend, autenticação, testes, containers, orquestração, cloud e CI/CD.

---

## 2. Objetivos do projeto

O ProjectHub foi criado principalmente para aprendizado prático.

O objetivo não era apenas aprender ferramentas isoladas, mas entender como elas podem ser combinadas dentro de uma aplicação de verdade.

Entre os principais objetivos estão:

1. Aprender e consolidar desenvolvimento backend com Node.js e TypeScript.
2. Construir uma API REST organizada e funcional.
3. Aprender modelagem e integração com PostgreSQL.
4. Trabalhar com ORM por meio do Prisma.
5. Implementar autenticação e autorização.
6. Aplicar validação de dados e tratamento de erros.
7. Documentar uma API com Swagger/OpenAPI.
8. Automatizar testes.
9. Entender containerização com Docker.
10. Entender conceitos básicos de Kubernetes.
11. Criar uma pipeline de CI/CD com GitHub Actions.
12. Explorar serviços de cloud e identidade da Microsoft por meio do Azure e Microsoft Entra ID.
13. Desenvolver uma interface que permita utilizar as funcionalidades da API de maneira visual e interativa.
14. Criar um projeto de portfólio que demonstre integração entre diferentes áreas da engenharia de software.

---

## 3. O que o ProjectHub possui

### Usuários

- Cadastro de usuários.
- Validação de dados.
- Normalização de e-mail.
- Senha armazenada com hash usando bcrypt.
- Consulta protegida de usuários.

### Autenticação

- Login por e-mail e senha.
- JWT com validade definida.
- Middleware de autenticação.
- Proteção de rotas privadas.
- Controle de acesso aos próprios projetos e tarefas.

### Projetos

- Criação de projetos.
- Listagem de projetos.
- Consulta individual.
- Atualização.
- Exclusão.
- Associação do projeto ao usuário proprietário.
- Pesquisa.
- Paginação.
- Controle de acesso por proprietário.

### Tarefas

- Criação de tarefas dentro de projetos.
- Listagem.
- Consulta.
- Atualização.
- Exclusão.
- Estados de tarefa:
  - `TODO`
  - `IN_PROGRESS`
  - `DONE`
- Associação opcional de tarefa a um usuário responsável.
- Controle de acesso por projeto.

### API

- API REST.
- JSON.
- Autenticação com Bearer Token.
- Swagger/OpenAPI.
- Console REST dentro do frontend.

### Qualidade e engenharia

- TypeScript.
- Prisma ORM.
- PostgreSQL.
- Zod.
- JWT.
- bcrypt.
- Testes automatizados.
- Docker.
- Kubernetes.
- GitHub Actions.
- Azure / Microsoft Entra ID.

---

## 4. Arquitetura geral

A aplicação pode ser entendida em camadas:

```text
┌───────────────────────────────────────────────┐
│                 FRONTEND WEB                  │
│          React + TypeScript + Vite            │
│                                               │
│ Dashboard | Projetos | Tarefas | Usuários    │
│ REST Console | API Docs | Infrastructure      │
└──────────────────────┬────────────────────────┘
                       │ HTTP / JSON
                       ▼
┌───────────────────────────────────────────────┐
│                    API                        │
│          Node.js + TypeScript + Express       │
│                                               │
│ Routes → Middleware → Validation → Services   │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│                   PRISMA                      │
│                     ORM                       │
└──────────────────────┬────────────────────────┘
                       │
                       ▼
┌───────────────────────────────────────────────┐
│               PostgreSQL / Neon               │
└───────────────────────────────────────────────┘

Infraestrutura e entrega:

GitHub
   │
   ▼
GitHub Actions
   ├── instalar dependências
   ├── gerar Prisma Client
   ├── executar testes
   ├── construir imagem Docker
   └── validar manifests Kubernetes

Docker
   │
   ▼
Container da aplicação
   │
   ▼
Kubernetes

Azure
   └── Microsoft Entra ID / identidade
```

---

## 5. Mapa de separação da aplicação

O projeto é separado por responsabilidades para evitar misturar infraestrutura, regras de negócio, rotas e interface.

```text
ProjectHub/
│
├── src/                         # Backend
│   ├── docs/                    # Swagger / OpenAPI
│   ├── lib/                     # Infraestrutura compartilhada
│   ├── middleware/              # Autenticação e tratamento de erros
│   ├── routes/                  # Endpoints REST
│   ├── schemas/                 # Validação com Zod
│   ├── app.ts                   # Configuração do Express
│   └── server.ts                # Inicialização do servidor
│
├── prisma/                     # Banco e modelo de dados
│   └── schema.prisma
│
├── tests/                      # Testes automatizados
│
├── frontend/                   # Aplicação web
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   └── pages/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── vite.config.ts
│
├── k8s/                        # Manifests Kubernetes
│   ├── deployment.yaml
│   ├── service.yaml
│   └── secret.example.yaml
│
├── .github/
│   └── workflows/
│       └── ci.yml              # Pipeline CI/CD
│
├── Dockerfile                  # Imagem do backend
├── .dockerignore
├── .gitignore
├── .env.example
└── README.md
```

A organização pode evoluir conforme o projeto crescer, mas a estrutura atual busca manter uma separação clara sem introduzir camadas e abstrações desnecessárias.

---

## 6. Mapa de desenvolvimento

Uma das características mais importantes do projeto foi o desenvolvimento incremental.

O ProjectHub não nasceu com toda a arquitetura pronta. Ele foi construído passo a passo, adicionando complexidade somente quando ela passou a fazer sentido.

### Etapa 1 — Node.js

O projeto começou com Node.js e Express.

Primeiro foi criada a base do servidor e uma rota simples para confirmar que a API estava funcionando.

Objetivo:

```text
Node.js
   ↓
Express
   ↓
Servidor HTTP
   ↓
Primeiro endpoint
```

### Etapa 2 — TypeScript

Depois, o projeto foi estruturado com TypeScript para adicionar tipagem ao código e tornar a manutenção mais segura.

### Etapa 3 — Banco de dados

Com a API funcionando, foi introduzido o PostgreSQL através do Neon.

Depois entrou o Prisma como ORM.

```text
PostgreSQL / Neon
        ▲
        │
      Prisma
        ▲
        │
    Node + Express
```

A primeira modelagem definiu o usuário e, posteriormente, foram adicionados projetos e tarefas.

### Etapa 4 — CRUD

Com o banco integrado, começaram a surgir as operações REST:

```text
GET
POST
PUT / PATCH
DELETE
```

Primeiro para usuários/projetos e posteriormente para tarefas.

### Etapa 5 — Autenticação

Depois que os recursos básicos estavam funcionando, foi adicionada autenticação com:

- bcrypt;
- JWT;
- middleware de autenticação.

Isso transformou endpoints públicos em uma API protegida.

### Etapa 6 — Autorização

Não bastava estar autenticado.

Também foi necessário verificar se o usuário realmente tinha permissão para acessar determinado projeto ou tarefa.

Exemplo conceitual:

```text
Usuário A
   │
   ├── Projeto A → permitido
   └── Projeto B do usuário B → bloqueado
```

### Etapa 7 — Validação

Zod foi introduzido para validar entradas recebidas pela API.

Isso evita aceitar dados obviamente inválidos antes de chegar às operações do banco.

### Etapa 8 — Tratamento de erros

Foi criado um middleware central para tratar erros e devolver respostas consistentes.

### Etapa 9 — Paginação e filtros

A listagem de projetos evoluiu para suportar:

- `page`;
- `limit`;
- `search`;
- total de registros;
- total de páginas.

### Etapa 10 — Swagger

Com a API já relativamente estável, a documentação OpenAPI/Swagger foi adicionada para facilitar testes e entendimento dos endpoints.

### Etapa 11 — Testes

Vitest e Supertest foram utilizados para automatizar cenários importantes da API.

### Etapa 12 — Docker

Depois do backend estar funcional, a aplicação passou a ser executada dentro de um container.

### Etapa 13 — Kubernetes

Depois de entender o container, foram criados Deployment e Service para aprender como Kubernetes gerencia a aplicação.

### Etapa 14 — CI/CD

O GitHub Actions passou a executar automaticamente:

```text
Push / Pull Request
        ↓
Dependências
        ↓
Prisma Client
        ↓
Testes
        ↓
Build Docker
        ↓
Validação Kubernetes
```

### Etapa 15 — Azure e identidade

Foi explorada a integração com Microsoft Entra ID, criando um fluxo de autenticação Microsoft que entrega a mesma identidade interna usada pelo ProjectHub.

### Etapa 16 — Frontend

Por fim, a API ganhou uma interface web completa.

O objetivo deixou de ser apenas demonstrar endpoints e passou a ser oferecer uma experiência de uso próxima da de um produto real.

---

## 7. Tecnologias utilizadas

### Backend

| Tecnologia | Função |
|---|---|
| Node.js | Runtime do backend |
| TypeScript | Tipagem e desenvolvimento do backend |
| Express | Framework HTTP/API |
| Prisma | ORM e acesso ao banco |
| PostgreSQL | Banco relacional |
| Neon | PostgreSQL hospedado |
| Zod | Validação de dados |
| bcrypt | Hash de senhas |
| jsonwebtoken | Autenticação JWT |
| Swagger UI / OpenAPI | Documentação da API |

### Testes

| Tecnologia | Função |
|---|---|
| Vitest | Runner de testes |
| Supertest | Testes HTTP da API |

### Frontend

| Tecnologia | Função |
|---|---|
| React | Interface web |
| TypeScript | Tipagem do frontend |
| Vite | Build e desenvolvimento |
| React Router | Roteamento |
| Axios | Requisições HTTP |
| CSS | Estilização e identidade visual |

### DevOps / Infraestrutura

| Tecnologia | Função |
|---|---|
| Docker | Containerização |
| Kubernetes | Orquestração e execução dos containers |
| GitHub Actions | CI/CD |
| Kubeconform | Validação dos manifests Kubernetes no CI |

### Cloud / Identidade

| Tecnologia | Função |
|---|---|
| Azure | Ambiente de cloud e serviços Microsoft utilizados no projeto |
| Microsoft Entra ID | Autenticação Microsoft / identidade |

### Versionamento

- Git
- GitHub

---

## 8. Backend

O backend é uma API REST desenvolvida com Node.js, Express e TypeScript.

O servidor é iniciado por `src/server.ts`, enquanto a configuração da aplicação fica em `src/app.ts`.

A separação entre esses arquivos permite manter a inicialização do servidor independente da configuração e dos testes da aplicação.

### Principais responsabilidades do backend

- receber requisições HTTP;
- validar dados;
- autenticar usuários;
- autorizar acesso aos recursos;
- executar operações no banco;
- devolver respostas JSON;
- documentar os endpoints;
- fornecer a base para o frontend.

---

## 9. Banco de dados

O banco utilizado é PostgreSQL hospedado no Neon.

O acesso é realizado através do Prisma.

### Modelo atual

```text
User
 │
 ├── 1:N ──> Project
 │             │
 │             └── 1:N ──> Task
 │
 └── 1:N ──> Task (assignee opcional)
```

### User

Campos principais:

- `id`
- `name`
- `email`
- `password`
- `createdAt`

### Project

Campos principais:

- `id`
- `name`
- `description`
- `createdAt`
- `updatedAt`
- `ownerId`

### Task

Campos principais:

- `id`
- `title`
- `description`
- `status`
- `createdAt`
- `updatedAt`
- `projectId`
- `assigneeId`

### Status das tarefas

O projeto utiliza um enum para impedir valores arbitrários no modelo:

```text
TODO
IN_PROGRESS
DONE
```

---

## 10. Autenticação e segurança

A autenticação tradicional utiliza JWT.

Fluxo básico:

```text
POST /auth/login
       │
       ▼
Verificação de e-mail e senha
       │
       ▼
bcrypt.compare()
       │
       ▼
JWT emitido
       │
       ▼
Authorization: Bearer <token>
       │
       ▼
authenticateToken
       │
       ▼
req.userId
```

### Senhas

Senhas não são armazenadas em texto puro.

O projeto utiliza bcrypt para gerar hashes antes de persistir as credenciais.

### JWT

O token contém informações necessárias para identificar o usuário autenticado e possui expiração definida.

### Autorização

O projeto também aplica controle de acesso por proprietário.

Isso significa que estar autenticado não garante acesso a qualquer projeto existente no banco.

### Segredos

Segredos ficam fora do código-fonte, utilizando variáveis de ambiente e Secrets do Kubernetes.

Arquivos como `.env` e o Secret real do Kubernetes não devem ser versionados.

O repositório utiliza arquivos de exemplo para documentar quais variáveis precisam existir.

---

## 11. API e funcionalidades

A API é organizada por domínio.

Principais grupos:

```text
/users
/auth
/projects
/projects/:projectId/tasks
/protected
/docs
```

### Usuários

Exemplo de criação:

```http
POST /users
Content-Type: application/json
```

```json
{
  "name": "Rian",
  "email": "rian@example.com",
  "password": "senha-segura"
}
```

### Login

```http
POST /auth/login
Content-Type: application/json
```

```json
{
  "email": "rian@example.com",
  "password": "senha-segura"
}
```

O login retorna um JWT utilizado pelas rotas protegidas.

### Projetos

A API oferece operações para criação, consulta, atualização e remoção de projetos.

A listagem suporta parâmetros como:

```text
?page=1&limit=10&search=project
```

A resposta inclui dados da página atual, total de registros e total de páginas.

### Tarefas

Tarefas são associadas aos projetos e podem ser consultadas por projeto.

O status é controlado pelo enum definido no Prisma.

### Swagger

A lista completa dos endpoints, parâmetros e modelos está disponível em `/docs` e deve ser tratada como a referência operacional da API.

---

## 12. Validação e tratamento de erros

O projeto utiliza Zod para validar entradas recebidas pela API.

Exemplo conceitual:

```text
Requisição
    ↓
Zod
    ├── válido → continua
    └── inválido → HTTP 400
```

Também existe um middleware central para tratamento de erros.

Isso evita espalhar a mesma lógica de formatação de erro em todos os endpoints.

Exemplos de respostas utilizadas pelo projeto incluem:

- `400` para dados inválidos;
- `401` para ausência de autenticação ou credenciais inválidas;
- `403` para token inválido/expirado;
- `404` para recurso não encontrado ou sem acesso pelo fluxo implementado;
- `409` para conflitos como cadastro duplicado;
- `500` para erro interno.

---

## 13. Documentação com Swagger

O Swagger UI está disponível em:

```text
http://localhost:3000/docs
```

Ele permite:

- visualizar os endpoints;
- entender parâmetros;
- visualizar corpos das requisições;
- testar a API;
- utilizar autenticação Bearer quando necessário.

Além de servir para desenvolvimento, o Swagger funciona como documentação técnica e demonstra preocupação com usabilidade para quem consome a API.

---

## 14. Testes automatizados

Os testes foram implementados com Vitest e Supertest.

A suíte cobre cenários importantes da aplicação, incluindo:

- rota principal;
- acesso sem JWT;
- acesso autenticado;
- senha incorreta;
- criação de projeto;
- criação de tarefa;
- isolamento entre usuários;
- validação de dados.

A meta dos testes não é testar cada linha de código, mas garantir que os fluxos críticos da API permaneçam funcionando enquanto o projeto evolui.

Execução:

```bash
npm test
```

---

## 15. Frontend

O projeto ganhou uma aplicação web em React + TypeScript + Vite para transformar a API em uma experiência interativa.

### Principais telas

- Login
- Dashboard
- Projetos
- Detalhe do projeto
- Tarefas
- Usuários
- REST Console
- API Docs
- Infrastructure

### Dashboard

Apresenta uma visão geral da aplicação e dos principais indicadores disponíveis.

### Projetos

Permite visualizar, pesquisar, criar e administrar os projetos através da interface.

### Tarefas

Permite acompanhar as tarefas de cada projeto e trabalhar com seus estados.

### REST Console

É uma das partes mais técnicas do frontend.

Ele permite executar chamadas HTTP diretamente pela interface utilizando métodos como:

```text
GET
POST
PUT
PATCH
DELETE
```

Isso cria uma ponte entre a experiência de uma aplicação web e a exploração manual que normalmente seria feita pelo Swagger.

### Infrastructure

Existe também um painel técnico que apresenta a arquitetura do projeto e o papel das principais tecnologias de infraestrutura.

Esse painel não cria informações fictícias de infraestrutura. Ele funciona como uma visão técnica/documental da arquitetura já implementada.

---

## 16. Docker

Docker é utilizado para empacotar a aplicação em uma imagem reproduzível.

O fluxo é:

```text
Código fonte
    ↓
Dockerfile
    ↓
Imagem projecthub
    ↓
Container
    ↓
API
```

Isso permite executar a aplicação em um ambiente padronizado sem depender da instalação manual de toda a stack.

### Build

Na raiz do backend:

```bash
docker build -t projecthub .
```

### Execução

Exemplo:

```bash
docker run --name projecthub -p 3000:3000 --env-file .env projecthub
```

---

## 17. Kubernetes

Kubernetes foi adicionado para aprender e demonstrar conceitos de orquestração de containers.

O projeto possui manifests para:

- Deployment;
- Service;
- Secret de configuração.

### Deployment

Define como o container da aplicação deve ser executado.

No cenário atual, o projeto utiliza uma réplica porque o objetivo é demonstrar o conceito sem adicionar complexidade desnecessária.

### Service

Expõe o aplicativo dentro do ambiente Kubernetes.

### Secret

As configurações sensíveis são fornecidas através de Secret em vez de ficarem no código ou em um manifesto público com valores reais.

### Execução local

O projeto foi testado com o Kubernetes do Docker Desktop.

Aplicação dos manifests:

```bash
kubectl apply -f k8s/
```

Para acessar localmente, pode ser utilizado port-forward:

```bash
kubectl port-forward service/projecthub 3000:3000
```

---

## 18. GitHub Actions e CI/CD

O projeto possui uma pipeline no GitHub Actions que é executada em eventos de `push` e `pull_request` na branch principal.

Pipeline atual:

```text
┌───────────────────────┐
│      GitHub Push      │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│ Checkout do código    │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│ Configuração Node.js  │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│ npm ci                │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│ Prisma Client         │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│ Testes automatizados  │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│ Docker build          │
└───────────┬───────────┘
            ▼
┌───────────────────────┐
│ Kubeconform           │
│ valida manifests K8s  │
└───────────────────────┘
```

### Por que Kubeconform?

O runner do GitHub Actions não possui automaticamente o mesmo cluster Kubernetes local usado no desenvolvimento.

Por isso, a validação dos manifests foi feita com Kubeconform, permitindo validar a estrutura dos arquivos sem depender de um API Server Kubernetes acessível no runner.

Isso mantém o pipeline simples e adequado ao objetivo do projeto.

---

## 19. Azure e Microsoft Entra ID

O Azure foi utilizado para explorar conceitos de cloud e, principalmente, integração com identidade Microsoft.

### Microsoft Entra ID

Foi registrada uma aplicação no Microsoft Entra ID com permissão Microsoft Graph `User.Read`.

O fluxo simplificado é:

```text
ProjectHub
    ↓
/auth/microsoft
    ↓
Microsoft Entra ID
    ↓
Login Microsoft
    ↓
/auth/microsoft/callback
    ↓
Usuário encontrado/criado
    ↓
JWT do ProjectHub
```

Isso demonstra como uma aplicação pode integrar um provedor de identidade externo sem abandonar o modelo de autenticação interno da própria aplicação.

### Azure como parte do aprendizado

O projeto também foi utilizado para estudar recursos de cloud, grupos de recursos, permissões e conceitos relacionados a hospedagem.

O objetivo principal desta etapa foi aprendizado e integração arquitetural, sem transformar o projeto em uma infraestrutura cara ou excessivamente complexa.

---

## 20. Estrutura de diretórios

### Backend

```text
src/
├── docs/
├── lib/
├── middleware/
├── routes/
├── schemas/
├── app.ts
└── server.ts
```

### Frontend

```text
frontend/
├── src/
│   ├── components/
│   ├── lib/
│   └── pages/
├── Dockerfile
├── nginx.conf
├── vite.config.ts
└── package.json
```

### Kubernetes

```text
k8s/
├── deployment.yaml
├── service.yaml
└── secret.example.yaml
```

### CI/CD

```text
.github/
└── workflows/
    └── ci.yml
```

---

## 21. Como executar o projeto

## Pré-requisitos

Para executar o backend:

- Node.js 22 ou compatível com a configuração do projeto;
- npm;
- acesso a um banco PostgreSQL/Neon;
- variáveis de ambiente configuradas.

Para executar o frontend:

- Node.js;
- npm;
- backend rodando.

Para Docker:

- Docker Desktop ou Docker Engine.

Para Kubernetes local:

- Docker Desktop com Kubernetes habilitado ou outro cluster Kubernetes disponível;
- `kubectl`.

Para testar o Microsoft Entra ID:

- aplicação registrada no Azure/Entra ID;
- credenciais/configuração correspondentes no ambiente local.

---

## 22. Variáveis de ambiente

Crie um arquivo `.env` a partir de `.env.example`.

Backend:

```env
DATABASE_URL=
JWT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_TENANT_ID=
MICROSOFT_CLIENT_SECRET=
```

Os valores reais não devem ser commitados.

### DATABASE_URL

É a string de conexão do PostgreSQL/Neon.

### JWT_SECRET

Chave usada para assinar os tokens JWT.

### MICROSOFT_CLIENT_ID

Identificador da aplicação registrada no Microsoft Entra ID.

### MICROSOFT_TENANT_ID

Identifica o tenant utilizado no fluxo de autenticação Microsoft.

### MICROSOFT_CLIENT_SECRET

Segredo usado pelo backend na troca do código de autorização.

---

## 23. Executando com Docker

Com o `.env` configurado:

```bash
docker build -t projecthub .
```

Depois:

```bash
docker run --name projecthub -p 3000:3000 --env-file .env projecthub
```

A API ficará disponível em:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/docs
```

---

## 24. Executando com Kubernetes

Primeiro, certifique-se de que o Secret necessário está configurado no cluster.

Exemplo local:

```bash
kubectl apply -f k8s/
```

Verifique os recursos:

```bash
kubectl get pods
kubectl get services
kubectl get deployment
```

Para desenvolvimento local, o port-forward permite acessar o Service:

```bash
kubectl port-forward service/projecthub 3000:3000
```

Depois:

```text
http://localhost:3000
```

---

## 25. Executando os testes

Instale as dependências:

```bash
npm ci
```

Execute:

```bash
npm test
```

A mesma ideia é executada automaticamente pelo GitHub Actions no pipeline de CI.

---

## 26. Fluxo de uso

O fluxo esperado de uso é:

```text
1. Criar usuário
        ↓
2. Fazer login
        ↓
3. Receber JWT
        ↓
4. Acessar dashboard
        ↓
5. Criar projeto
        ↓
6. Criar tarefas
        ↓
7. Atualizar status
        ↓
8. Consultar filtros/paginação
        ↓
9. Gerenciar projetos/tarefas
        ↓
10. Explorar API/infraestrutura pelo frontend
```

Também é possível utilizar Swagger ou o REST Console para testar diretamente os endpoints.

---

## 27. Por que o projeto é robusto

A robustez do ProjectHub não vem de possuir centenas de arquivos ou de utilizar tecnologia apenas para aumentar a lista.

Ela vem da quantidade de responsabilidades que a aplicação consegue integrar de maneira coerente.

O mesmo projeto demonstra:

```text
Desenvolvimento
├── Backend
├── Banco de dados
├── API REST
├── Frontend
└── Autenticação

Qualidade
├── TypeScript
├── Validação
├── Tratamento de erros
├── Testes
└── Documentação

Infraestrutura
├── Docker
├── Kubernetes
└── Secrets

Automação
└── GitHub Actions / CI

Cloud / Identity
└── Azure / Microsoft Entra ID
```

Isso faz do ProjectHub um projeto de aprendizado muito mais completo do que uma aplicação CRUD isolada.

O principal valor está na integração entre as partes.

---

## 28. Decisões de arquitetura

Uma regra importante guiou o desenvolvimento:

> Complicar apenas o suficiente para demonstrar conhecimento.

Por isso, algumas escolhas foram deliberadamente simples.

### Uma API principal

Não foram criados múltiplos microsserviços apenas para demonstrar que microsserviços existem.

Uma API modular atende muito bem ao objetivo atual.

### PostgreSQL gerenciado

O Neon elimina a necessidade de manter um banco local permanente e aproxima o projeto de um cenário real de serviço gerenciado.

### Docker simples

O container do backend serve para padronizar a execução.

### Kubernetes simples

Deployment, Service e Secret são suficientes para demonstrar os conceitos essenciais sem criar um cluster artificialmente complexo.

### CI simples e útil

A pipeline executa verificações que realmente ajudam:

- dependências;
- Prisma;
- testes;
- build Docker;
- validação Kubernetes.

### Frontend integrado à API real

A interface não é apenas uma tela estática. Ela existe para consumir a API e tornar suas funções utilizáveis.

---

## 29. Melhorias futuras

O projeto já cumpre um conjunto amplo de objetivos, mas pode evoluir.

### Backend

- melhorar tipagem e remover casts pontuais;
- ampliar cobertura de testes;
- adicionar testes de integração mais completos;
- validação mais rigorosa de filtros e parâmetros;
- rate limiting;
- logs estruturados;
- observabilidade;
- paginação também para outras coleções;
- refresh tokens;
- política de autorização mais granular;
- migrations Prisma organizadas para ambientes de produção.

### Frontend

- estados de loading/error ainda mais refinados;
- notificações e feedback visual mais completos;
- edição de projetos e tarefas mais rica;
- dashboard com mais métricas reais;
- testes de componentes e fluxo;
- acessibilidade mais aprofundada;
- deploy próprio do frontend.

### DevOps / Cloud

- build e publicação da imagem em registry;
- deploy automatizado em ambiente remoto;
- ambientes separados de staging e produção;
- gerenciamento de secrets com serviço dedicado;
- monitoramento;
- health checks e readiness/liveness probes;
- autoscaling quando fizer sentido;
- infraestrutura como código;
- observabilidade centralizada.

### Arquitetura

Caso o produto cresça significativamente, podem ser avaliados:

- filas;
- processamento assíncrono;
- cache;
- serviços especializados;
- mensageria;
- arquitetura distribuída.

Essas evoluções só devem ser introduzidas quando houver necessidade real. A arquitetura atual é suficiente para o tamanho e objetivo do projeto.

---

## 30. Conclusão

O ProjectHub representa a evolução de uma aplicação que começou de forma simples em Node.js e foi crescendo junto com o aprendizado.

O desenvolvimento seguiu uma abordagem incremental:

```text
Node.js
   ↓
Express
   ↓
TypeScript
   ↓
PostgreSQL / Neon
   ↓
Prisma
   ↓
GET / POST / PUT / DELETE
   ↓
Autenticação JWT
   ↓
Autorização
   ↓
Validação e erros
   ↓
Swagger
   ↓
Testes
   ↓
Docker
   ↓
Kubernetes
   ↓
GitHub Actions / CI
   ↓
Azure / Entra ID
   ↓
Frontend React
   ↓
Aplicação completa e utilizável
```

O resultado é uma aplicação que reúne desenvolvimento web, banco de dados, segurança, documentação, testes, containerização, orquestração, CI/CD, cloud e frontend em um único projeto.

Mais do que uma coleção de tecnologias, o ProjectHub foi pensado como uma experiência prática de desenvolvimento de software ponta a ponta: começar com um servidor funcionando, transformar esse servidor em uma API real, conectar um banco de dados, proteger os recursos, documentar, testar, empacotar, automatizar, explorar infraestrutura e finalmente transformar tudo isso em uma aplicação web com usabilidade.

O projeto pode continuar crescendo, mas já representa uma base sólida para demonstrar conhecimento técnico, capacidade de integração entre tecnologias e, principalmente, capacidade de desenvolver uma aplicação completa do início ao fim.

---

## Status do projeto

**Projeto funcional e em evolução.**

O backend, banco, autenticação, documentação, testes, Docker, Kubernetes, CI/CD, integração de identidade Microsoft e frontend fazem parte da mesma proposta de aplicação.

---

## Autor

**Rian Friedrich**

Projeto desenvolvido para aprendizado prático, portfólio e aprofundamento em desenvolvimento de software, backend, frontend, banco de dados, DevOps, cloud e integração de serviços.

