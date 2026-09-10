FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./

RUN DATABASE_URL="URL DO DATABASE" npx prisma generate

COPY src ./src
COPY tsconfig.json ./

EXPOSE 3000

CMD ["npm", "run", "dev"]