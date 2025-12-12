# Backend API Template V2

Um template completo de API REST construída com NestJS, TypeScript e TypeORM, configurada para rodar com Docker e MariaDB.

## 🚀 Tecnologias

- **[NestJS](https://nestjs.com/)** v11.x - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** v5.x - Linguagem tipada
- **[TypeORM](https://typeorm.io/)** v0.3.x - ORM para TypeScript e JavaScript
- **[MariaDB](https://mariadb.org/)** v11.2 - Banco de dados relacional
- **[Docker](https://www.docker.com/)** - Containerização
- **[Swagger](https://swagger.io/)** - Documentação da API
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - Linting e formatação

## 📋 Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/) - Para usar os comandos do Makefile
- Opcionalmente: [Node.js](https://nodejs.org/) v18+ e [npm](https://www.npmjs.com/) para desenvolvimento local

## 🚀 Início Rápido

### 1. Clone o repositório e configure o ambiente

```bash
git clone <url-do-repositorio>
cd backend

# Cria automaticamente o arquivo .env e sobe o ambiente
make dev
```

### 2. Ou configure manualmente

```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite as variáveis se necessário
vim .env

# Suba os containers
make up
```

## ⚙️ Comandos Disponíveis (Makefile)

O projeto usa um **Makefile** para facilitar o desenvolvimento. Use `make help` para ver todos os comandos:

### Comandos Principais

```bash
make dev          # Setup completo para desenvolvimento
make up           # Subir containers de desenvolvimento
make up-prod      # Subir containers para produção
make down         # Parar todos os containers
make status       # Ver status dos containers
make logs         # Ver logs de todos os containers
```

### Desenvolvimento

```bash
make shell        # Acessar shell da aplicação
make db          # Acessar MariaDB CLI
make test        # Executar testes
make lint        # Executar linter
make format      # Formatar código
```

## 🗄️ Banco de Dados

### Informações da Conexão

- **Host**: localhost (via Docker)
- **Porta**: 3307 (mapeada do container)
- **Usuário**: backend_app_user
- **Senha**: backend_app_pass
- **Database**: backend_app_db

### Acesso ao Banco

```bash
# Via Makefile (recomendado)
make db

# Via docker-compose diretamente
docker-compose exec mariadb mysql -u backend_app_user -p backend_app_db
```

### Migrações

```bash
# Gerar migração (dentro do container)
make shell
npm run migration:generate -- NomeDaMigracao

# Criar migração vazia
npm run migration:create -- src/core/database/migrations/NomeDaMigracao

# Executar migrações
npm run migration:run

# Reverter última migração
npm run migration:revert

# Visualizar status das migrações
npm run migration:show
```

### Backup e Restore

```bash
make backup-db              # Fazer backup
make restore-db FILE=backup.sql  # Restaurar backup
```

## 🧪 Testes

```bash
# Via Makefile (recomendado)
make test         # Testes unitários
make test-watch   # Testes em modo watch
make test-e2e     # Testes end-to-end

# Ou dentro do container
make shell
npm run test
npm run test:watch
npm run test:e2e
npm run test:cov
```

## 📖 Documentação da API

Após iniciar a aplicação:

- **Swagger UI**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/health
- **API Base**: http://localhost:3000

## 🐳 Docker

### Containers do Projeto

- **backend_app** - Aplicação NestJS (porta 3000)
- **backend_database** - MariaDB 11.2 (porta 3307)

### Comandos Úteis

```bash
# Via Makefile (recomendado)
make build        # Build da aplicação
make rebuild      # Rebuild sem cache
make shell        # Acessar container da app
make shell-db     # Acessar container do banco
make logs-app     # Logs da aplicação
make logs-db      # Logs do banco
make health       # Status dos containers

# Limpeza
make clean        # Remove containers e volumes
make clean-all    # Limpeza completa do sistema
```

## 📁 Estrutura do Projeto

```
src/
├── app.module.ts                    # Módulo principal da aplicação
├── main.ts                          # Ponto de entrada
├── core/                            # Funcionalidades principais do sistema
│   ├── database/                    # Configuração e migrations do banco
│   │   ├── database.module.ts
│   │   ├── database.provider.ts
│   │   ├── ormconfig.ts
│   │   ├── README.md
│   │   └── migrations/              # Migrations do TypeORM
│   └── shared/                      # Utilitários compartilhados
│       ├── dto/                     # DTOs base
│       ├── filters/                 # Exception filters
│       ├── helpers/                 # Funções auxiliares
│       ├── interceptors/            # Interceptors globais
│       └── services/                # Serviços compartilhados
├── features/                        # Módulos de funcionalidades
│   └── _example/                    # Exemplo de implementação
│       ├── employees/               # CRUD de funcionários
│       └── shared/
│           └── entities/            # Entidades de exemplo
test/                                # Testes E2E
docker/                              # Configurações Docker
├── mariadb/
│   ├── conf/                        # Configurações do MariaDB
│   └── init/                        # Scripts de inicialização
```

## ⚠️ Arquivos de Exemplo

Este template inclui arquivos de exemplo para orientação:

- **`src/features/_example/`** - Exemplo completo de CRUD (Employee)
- **Entidades** - `employee.entity.ts` e `extension_number.entity.ts`
- **Migrations** - Migration de exemplo para as tabelas

### 🚀 Para Novo Projeto

1. **Estude os exemplos** em `src/features/_example/`
2. **Remova** a pasta `_example` quando não precisar mais
3. **Delete migrations** de exemplo em `src/core/database/migrations/`
4. **Crie** suas próprias entidades baseadas nos padrões dos exemplos

## 🛠️ Scripts NPM Disponíveis

### Aplicação

- `npm run start` - Produção
- `npm run start:dev` - Desenvolvimento com watch
- `npm run start:debug` - Debug mode
- `npm run build` - Build da aplicação

### Qualidade de Código

- `npm run lint` - ESLint
- `npm run format` - Prettier
- `npm run test` - Jest tests
- `npm run test:watch` - Tests em watch mode
- `npm run test:e2e` - Testes end-to-end
- `npm run test:cov` - Coverage report

### Database

- `npm run migration:generate` - Gerar migration
- `npm run migration:create` - Criar migration vazia
- `npm run migration:run` - Executar migrations
- `npm run migration:revert` - Reverter migration
- `npm run migration:show` - Status das migrations

## 🔧 Variáveis de Ambiente

Configure no arquivo `.env` (copie de `.env.example`):

```env
NODE_ENV=development
PORT=3000

# Database
MARIADB_HOST=localhost
MARIADB_PORT=3307
MARIADB_USER=backend_app_user
MARIADB_PASSWORD=backend_app_pass
MARIADB_DATABASE=backend_app_db
MARIADB_SSL=false

# Timezone
TZ=America/Sao_Paulo

# Migrations (apenas desenvolvimento)
RUN_MIGRATIONS=false
```

## 🆘 Troubleshooting

### Containers não sobem

```bash
make down
make clean
make up
```

### Problemas com permissões

```bash
sudo chown -R $USER:$USER .
make rebuild
```

### Reset completo

```bash
make clean-all
make dev
```

## 📋 TODO

- [ ] Implementar autenticação JWT
- [ ] Implementar testes
- [ ] Implementar rate limiting
- [ ] Adicionar logs

---

**Tecnologia da Informação - Grupo CAIO**
