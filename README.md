# Backend API

Uma API REST construída com NestJS, TypeScript e TypeORM, configurada para rodar com Docker e MariaDB.

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** - Linguagem tipada
- **[TypeORM](https://typeorm.io/)** - ORM para TypeScript e JavaScript
- **[MariaDB](https://mariadb.org/)** - Banco de dados relacional
- **[Docker](https://www.docker.com/)** - Containerização
- **[Swagger](https://swagger.io/)** - Documentação da API

## 📋 Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd backend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```bash
cp .env.example .env
```

### 4. Execute com Docker (Recomendado)

```bash
# Desenvolvimento
docker-compose up -d

# Produção
docker-compose -f docker-compose.prod.yml up -d
```

### 5. Ou execute localmente

```bash
# Desenvolvimento
npm run start:dev

# Produção
npm run build
npm run start:prod
```

## 🗄️ Banco de Dados

### Migrações

```bash
# Gerar migração
npm run migration:generate -- src/core/database/migrations/NomeDaMigracao

# Criar migração vazia
npm run migration:create -- src/core/database/migrations/NomeDaMigracao

# Executar migrações
npm run migration:run

# Reverter última migração
npm run migration:revert

# Visualizar status das migrações
npm run migration:show
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes em modo watch
npm run test:watch

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

## 📖 Documentação da API

Após iniciar a aplicação, a documentação Swagger estará disponível em:

- **Desenvolvimento**: `http://localhost:3000/api`
- **Produção**: `http://localhost:3000/api`

## 🐳 Docker

### Comandos úteis

```bash
# Construir imagem
docker-compose build

# Parar containers
docker-compose down

# Ver logs
docker-compose logs -f

# Executar comandos no container
docker-compose exec backend sh
```

## 📁 Estrutura do Projeto

```
src/
├── app.module.ts          # Módulo principal
├── main.ts                # Ponto de entrada
├── core/                  # Funcionalidades principais
│   ├── database/          # Configuração do banco
│   └── shared/            # Utilitários compartilhados
└── features/              # Módulos de funcionalidades
```

## 🛠️ Scripts Disponíveis

- `npm run start` - Inicia em modo produção
- `npm run start:dev` - Inicia em modo desenvolvimento
- `npm run start:debug` - Inicia em modo debug
- `npm run build` - Constrói a aplicação
- `npm run format` - Formata o código
- `npm run lint` - Executa o linter

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie sua feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).
