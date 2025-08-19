# API Node.js - Sistema de Cursos

Uma API RESTful desenvolvida em Node.js com TypeScript, Fastify e PostgreSQL para gerenciamento de cursos e usuários.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação tipada
- **Fastify** - Framework web rápido e eficiente
- **PostgreSQL** - Banco de dados relacional
- **Drizzle ORM** - ORM moderno e type-safe
- **JWT** - Autenticação baseada em tokens
- **Argon2** - Hash seguro de senhas
- **Zod** - Validação de schemas
- **Vitest** - Framework de testes
- **Docker** - Containerização

## 📋 Pré-requisitos

- Node.js 18+ 
- Docker e Docker Compose
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd api-node
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` com suas configurações:
   ```env
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/desafio
   JWT_SECRET=sua-chave-secreta-aqui
   NODE_ENV=development
   ```

4. **Inicie o banco de dados com Docker**
   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações do banco**
   ```bash
   npm run db:migrate
   ```

6. **Popule o banco com dados iniciais (opcional)**
   ```bash
   npm run db:seed
   ```

## 🚀 Como Executar

### Desenvolvimento
```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`

### Documentação da API
Acesse `http://localhost:3333/docs` para visualizar a documentação interativa da API.

## 📚 Estrutura do Projeto

```
src/
├── app.ts                 # Configuração principal do Fastify
├── server.ts             # Servidor HTTP
├── database/
│   ├── client.ts         # Cliente do banco de dados
│   ├── schema.ts         # Schemas das tabelas
│   └── seed.ts           # Dados iniciais
├── routes/
│   ├── login.ts          # Autenticação
│   ├── createCourse.ts   # Criação de cursos
│   ├── getCourses.ts     # Listagem de cursos
│   ├── getCourseById.ts  # Busca curso por ID
│   └── hooks/
│       └── checkRequestJWT.ts  # Middleware de autenticação
├── tests/
│   ├── factories/        # Factories para testes
│   └── *.test.ts         # Testes das rotas
└── @types/
    └── fastify.d.ts      # Extensões de tipos do Fastify
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar rotas protegidas:

1. **Faça login** via `POST /sessions`
2. **Use o token** retornado no header `Authorization: Bearer <token>`

### Tipos de Usuário
- **student**: Usuário comum
- **manager**: Administrador com privilégios especiais

## 📡 Endpoints da API

### Autenticação
- `POST /sessions` - Login de usuário

### Cursos
- `GET /courses` - Lista todos os cursos (com paginação e busca)
- `GET /courses/:id` - Busca curso por ID (requer autenticação)
- `POST /courses` - Cria novo curso (requer autenticação de manager)

## 🧪 Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes com cobertura
```bash
npm run test:coverage
```

### Executar testes em modo watch
```bash
npm run test:watch
```

## 🗄️ Banco de Dados

### Comandos úteis

```bash
# Gerar nova migration
npm run db:generate

# Executar migrations
npm run db:migrate

# Abrir Drizzle Studio (interface visual)
npm run db:studio

# Popular banco com dados de teste
npm run db:seed
```

### Estrutura das Tabelas

- **users**: Usuários do sistema
- **courses**: Cursos disponíveis
- **enrollments**: Matrículas de usuários em cursos

## 🔧 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor em modo desenvolvimento |
| `npm test` | Executa testes |
| `npm run db:generate` | Gera nova migration |
| `npm run db:migrate` | Executa migrations |
| `npm run db:studio` | Abre interface visual do banco |
| `npm run db:seed` | Popula banco com dados iniciais |

## 🐳 Docker

### Iniciar apenas o banco de dados
```bash
docker-compose up -d
```

### Parar o banco de dados
```bash
docker-compose down
```

## 📝 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `DATABASE_URL` | URL de conexão com PostgreSQL | - |
| `JWT_SECRET` | Chave secreta para JWT | - |
| `NODE_ENV` | Ambiente de execução | development |
| `PORT` | Porta do servidor | 3333 |

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas, abra uma issue no repositório.
