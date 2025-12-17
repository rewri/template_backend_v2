# Makefile para gerenciar containers Docker
.PHONY: help up down build rebuild logs shell db clean install test lint format status health

# Configurações
COMPOSE_FILE := docker-compose.yml
COMPOSE_PROD_FILE := docker-compose.prod.yml
APP_CONTAINER := backend_app
DB_CONTAINER := backend_database

# Cores para output
GREEN := \033[0;32m
YELLOW := \033[1;33m
RED := \033[0;31m
NC := \033[0m # No Color

# Comando padrão - mostra ajuda
help: ## Mostra esta ajuda
	@echo "$(GREEN)Comandos disponíveis:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'

# Comandos principais
up: ## Subir todos os containers (desenvolvimento)
	@echo "$(GREEN)Subindo containers de desenvolvimento...$(NC)"
	@docker compose -f $(COMPOSE_FILE) up -d --remove-orphans
	@echo "$(GREEN)Containers iniciados!$(NC)"
	@make status

up-logs: ## Subir containers com logs (para debug)
	@echo "$(GREEN)Subindo containers com logs...$(NC)"
	@docker compose -f $(COMPOSE_FILE) up --remove-orphans

up-prod: ## Subir containers para produção
	@echo "$(GREEN)Subindo containers de produção...$(NC)"
	@docker compose -f $(COMPOSE_FILE) -f $(COMPOSE_PROD_FILE) up -d --remove-orphans
	@make status

down: ## Parar e remover todos os containers
	@echo "$(YELLOW)Parando containers...$(NC)"
	@docker compose -f $(COMPOSE_FILE) down
	@echo "$(GREEN)Containers parados!$(NC)"

build: ## Build da imagem da aplicação
	@echo "$(GREEN)Building aplicação...$(NC)"
	@docker compose -f $(COMPOSE_FILE) build app

rebuild: ## Rebuild completo (sem cache)
	@echo "$(GREEN)Rebuild completo da aplicação...$(NC)"
	@docker compose -f $(COMPOSE_FILE) build --no-cache app

# Logs e monitoramento
logs: ## Ver logs de todos os containers
	@docker compose -f $(COMPOSE_FILE) logs -f

logs-app: ## Ver logs apenas da aplicação
	@docker compose -f $(COMPOSE_FILE) logs -f app

logs-db: ## Ver logs apenas do banco
	@docker compose -f $(COMPOSE_FILE) logs -f mariadb

status: ## Mostrar status dos containers
	@echo "$(GREEN)Status dos containers:$(NC)"
	@docker compose -f $(COMPOSE_FILE) ps

health: ## Verificar saúde dos containers
	@echo "$(GREEN)Verificando saúde dos containers:$(NC)"
	@docker ps --filter "name=backend_" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Acesso aos containers
shell: ## Acessar shell da aplicação
	@docker compose -f $(COMPOSE_FILE) exec app sh

shell-db: ## Acessar shell do MariaDB
	@docker compose -f $(COMPOSE_FILE) exec mariadb sh

db: ## Acessar MariaDB CLI
	@echo "$(GREEN)Conectando ao MariaDB...$(NC)"
	@docker compose -f $(COMPOSE_FILE) exec mariadb mysql -u backend_app_user -p backend_app_db

# Desenvolvimento
install: ## Instalar dependências npm
	@echo "$(GREEN)Instalando dependências...$(NC)"
	@docker compose -f $(COMPOSE_FILE) exec app npm install

setup-deps: ## Setup de dependências + hooks
	@echo "$(GREEN)🚀 Setup de dependências do projeto...$(NC)"
	@make install
	@make setup-hooks
	@echo "$(GREEN)✅ Dependências e hooks configurados!$(NC)"
	@echo "$(YELLOW)📋 Hooks ativados (ESLint + Prettier + Build + TypeScript)$(NC)"

setup-hooks: ## Configurar hooks de código (Husky + lint-staged)
	@echo "$(GREEN)⚙️  Configurando hooks...$(NC)"
	@docker compose -f $(COMPOSE_FILE) exec app npm run prepare
	@echo "$(GREEN)✅ Hooks configurados!$(NC)"
	@echo "$(YELLOW)📝 Pre-commit: ESLint + Prettier + Build + TypeScript validation$(NC)"

setup-local: ## Setup para desenvolvimento local (sem Docker)
	@echo "$(GREEN)🏠 Setup local do projeto...$(NC)"
	@npm install
	@npm run prepare
	@echo "$(GREEN)✅ Setup local concluído!$(NC)"

test: ## Executar testes
	@echo "$(GREEN)Executando testes...$(NC)"
	@docker compose -f $(COMPOSE_FILE) exec app npm run test

test-watch: ## Executar testes em modo watch
	@docker compose -f $(COMPOSE_FILE) exec app npm run test:watch

test-e2e: ## Executar testes E2E
	@echo "$(GREEN)Executando testes E2E...$(NC)"
	@docker compose -f $(COMPOSE_FILE) exec app npm run test:e2e

lint: ## Executar linter
	@docker compose -f $(COMPOSE_FILE) exec app npm run lint

format: ## Formatar código
	@docker compose -f $(COMPOSE_FILE) exec app npm run format

validate: ## Executar todas as validações de qualidade
	@echo "$(GREEN)🔍 Executando validações de qualidade...$(NC)"
	@docker compose -f $(COMPOSE_FILE) exec app npm run lint
	@docker compose -f $(COMPOSE_FILE) exec app npm run format
	@docker compose -f $(COMPOSE_FILE) exec app npx tsc --noEmit
	@docker compose -f $(COMPOSE_FILE) exec app npm run build
	@docker compose -f $(COMPOSE_FILE) exec app npm run test
	@echo "$(GREEN)✅ Todas as validações passaram!$(NC)"

quality-check: ## Verificação rápida de qualidade (sem testes)
	@echo "$(GREEN)⚡ Verificação rápida de qualidade...$(NC)"
	@docker compose -f $(COMPOSE_FILE) exec app npm run lint
	@docker compose -f $(COMPOSE_FILE) exec app npx tsc --noEmit
	@echo "$(GREEN)✅ Qualidade de código OK!$(NC)"

# Limpeza e manutenção
clean: ## Parar containers e remover volumes (⚠️  APAGA DADOS DO BANCO)
	@echo "$(RED)⚠️  ATENÇÃO: Isso irá apagar todos os dados do banco!$(NC)"
	@read -p "Tem certeza? (y/N): " confirm && [ "$$confirm" = "y" ] || exit 1
	@docker compose -f $(COMPOSE_FILE) down -v
	@echo "$(GREEN)Containers e volumes removidos!$(NC)"

clean-images: ## Remover imagens não utilizadas
	@echo "$(GREEN)Removendo imagens não utilizadas...$(NC)"
	@docker image prune -f

clean-all: ## Limpeza completa (containers, volumes, imagens, cache)
	@echo "$(RED)⚠️  LIMPEZA COMPLETA - Isso irá remover TUDO!$(NC)"
	@read -p "Tem certeza? (y/N): " confirm && [ "$$confirm" = "y" ] || exit 1
	@docker compose -f $(COMPOSE_FILE) down -v
	@docker system prune -af --volumes
	@echo "$(GREEN)Limpeza completa realizada!$(NC)"

# Backup e restore
backup-db: ## Fazer backup do banco de dados
	@echo "$(GREEN)Fazendo backup do banco...$(NC)"
	@mkdir -p backups
	@docker compose -f $(COMPOSE_FILE) exec -T mariadb mariadb-dump -u backend_app_user -pbackend_app_pass backend_app_db > backups/backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)Backup salvo em backups/$(NC)"

restore-db: ## Restaurar banco (precisa especificar arquivo: make restore-db FILE=backup.sql)
	@if [ -z "$(FILE)" ]; then echo "$(RED)Erro: Especifique o arquivo com FILE=nome_do_arquivo.sql$(NC)"; exit 1; fi
	@echo "$(GREEN)Restaurando banco de $(FILE)...$(NC)"
	@docker compose -f $(COMPOSE_FILE) exec -T mariadb mariadb -u backend_app_user -pbackend_app_pass backend_app_db < $(FILE)

# Utilitários
env: ## Copiar arquivo de exemplo de ambiente
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "$(GREEN)Arquivo .env criado! Configure as variáveis necessárias.$(NC)"; \
	else \
		echo "$(YELLOW)Arquivo .env já existe.$(NC)"; \
	fi

restart: ## Reiniciar todos os containers
	@echo "$(GREEN)Reiniciando containers...$(NC)"
	@docker compose -f $(COMPOSE_FILE) restart
	@make status

restart-app: ## Reiniciar apenas a aplicação
	@docker compose -f $(COMPOSE_FILE) restart app

restart-db: ## Reiniciar apenas o banco
	@docker compose -f $(COMPOSE_FILE) restart mariadb

# Comandos de conveniência
dev: env up setup-deps ## Setup completo para desenvolvimento
	@echo "$(GREEN)Ambiente de desenvolvimento pronto!$(NC)"
	@echo "$(YELLOW)Acesse: http://localhost:3000$(NC)"
	@echo "$(YELLOW)Health: http://localhost:3000/health$(NC)"

setup: ## Setup completo do projeto - tudo que o dev precisa para iniciar (RECOMENDADO)
	@echo "$(GREEN)🎯 Setup completo do projeto...$(NC)"
	@make env
	@make up
	@make setup-deps
	@echo "$(GREEN)🎉 Projeto totalmente configurado!$(NC)"
	@echo "$(YELLOW)📋 Próximos passos:$(NC)"
	@echo "$(YELLOW)   - Edite .env com suas configurações$(NC)"
	@echo "$(YELLOW)   - Acesse http://localhost:3000$(NC)"
	@echo "$(YELLOW)   - Os hooks estão ativos!$(NC)"

prod: env up-prod ## Setup para produção
	@echo "$(GREEN)Ambiente de produção iniciado!$(NC)"
