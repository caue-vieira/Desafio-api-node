FROM node:22-alpine AS builder

WORKDIR /app

COPY . ./

# Instala as dependências EXATAMENTE como estão no package-lock
RUN npm ci --only=production

EXPOSE 3333

CMD ["node", "src/server.ts"]