# Database Migrations - TypeORM

Este documento fornece um guia passo-a-passo para trabalhar com migrations do TypeORM neste projeto.

## Estrutura do Banco de Dados

- **Tipo**: MySQL/MariaDB
- **Diretório de Migrations**: `src/core/database/migrations/`
- **Tabela de Controle**: `migrations`
- **Timezone**: America/Sao_Paulo

## Comandos Disponíveis

O projeto possui os seguintes scripts npm para gerenciar migrations:

```bash
# Gerar uma nova migration baseada nas mudanças das entidades
npm run migration:generate -- NomeDaMigration

# Criar uma migration vazia
npm run migration:create -- src/core/database/migrations/NomeDaMigration

# Executar migrations pendentes
npm run migration:run

# Reverter a última migration executada
npm run migration:revert

# Mostrar status das migrations
npm run migration:show
```

**⚠️ Importante**: Execute estes comandos **dentro do container**:

```bash
# Via Makefile (recomendado)
make shell
# Depois execute os comandos npm acima

# Ou diretamente via docker-compose
docker-compose exec app sh
```

## Passo-a-Passo: Criando Migrations

### 1. Criando/Modificando Entidades

Primeiro, crie ou modifique suas entidades em `src/features/[feature]/shared/entities/`:

```typescript
// Exemplo: employee.entity.ts
@Entity({ name: 'employees' })
@Index('idx_employee_email', ['email'])
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
```

### 2. Gerando Migration Automaticamente

Após criar/modificar suas entidades, gere a migration:

```bash
npm run migration:generate -- EmployeeCreate
```

**Importante**: Use nomes descritivos no formato `[Entidade][Acao]` (ex: `EmployeeCreate`, `UserUpdate`, `ProductAddColumn`)

### 3. Revisando a Migration Gerada

O comando anterior criará um arquivo em `src/core/database/migrations/` com formato:

```
[timestamp]-[NomeDaMigration].ts
```

Exemplo de migration gerada:

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmployeeCreate1765459754251 implements MigrationInterface {
  name = 'EmployeeCreate1765459754251';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`employees\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`),
                INDEX \`idx_employee_email\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`idx_employee_email\` ON \`employees\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`employees\``,
    );
    await queryRunner.query(`DROP TABLE \`employees\``);
  }
}
```

### 4. Executando a Migration

Após revisar e confirmar que a migration está correta:

```bash
npm run migration:run
```

### 5. Verificando Status

Para verificar quais migrations foram executadas:

```bash
npm run migration:show
```

## Migrations Manuais

Para casos específicos onde é necessário criar uma migration customizada:

### 1. Criar Migration Vazia

```bash
npm run migration:create -- src/core/database/migrations/CustomDataMigration
```

### 2. Implementar a Lógica

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CustomDataMigration1765459754251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionar dados iniciais
    await queryRunner.query(`
            INSERT INTO employees (name, email) VALUES 
            ('Admin User', 'admin@example.com')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover dados adicionados
    await queryRunner.query(`
            DELETE FROM employees WHERE email = 'admin@example.com'
        `);
  }
}
```

## Boas Práticas

### Nomenclatura

- Use nomes descritivos: `EmployeeCreate`, `UserAddPhoneColumn`, `ProductUpdateIndexes`
- Mantenha consistência: `[Entidade][Acao]`

### Estrutura das Migrations

- **up()**: Aplica as mudanças (CREATE, ALTER, INSERT, etc.)
- **down()**: Reverte as mudanças (DROP, DELETE, etc.)
- Sempre implemente ambos os métodos

### Testes

- Execute `npm run migration:run` em ambiente de desenvolvimento
- Teste o rollback com `npm run migration:revert`
- Verifique se não há perda de dados

### Índices e Constraints

- Use índices apropriados para queries frequentes
- Defina constraints de integridade referencial
- Considere performance em tabelas grandes

## Rollback de Migrations

Para reverter migrations:

```bash
# Reverter a última migration
npm run migration:revert

# Para reverter múltiplas migrations, execute o comando várias vezes
npm run migration:revert  # Reverte migration N
npm run migration:revert  # Reverte migration N-1
```

## Troubleshooting

### Migration não é gerada

- Verifique se as entidades estão sendo exportadas corretamente
- Confirme que não há erros de sintaxe nas entidades
- Certifique-se de que o banco está acessível

### Erro ao executar migration

- Verifique a conexão com o banco de dados
- Confirme as variáveis de ambiente (`.env`)
- Revise o SQL gerado na migration

### Conflitos de migration

- Mantenha a branch sempre atualizada
- Resolva conflitos de timestamp renomeando arquivos se necessário
- Coordene com a equipe para evitar migrations simultâneas

## Variáveis de Ambiente Necessárias

```env
MARIADB_HOST=localhost
MARIADB_PORT=3307                    # Porta mapeada do container
MARIADB_USER=backend_app_user        # Usuário da aplicação
MARIADB_PASSWORD=backend_app_pass    # Senha da aplicação
MARIADB_DATABASE=backend_app_db      # Nome do banco
MARIADB_SSL=false
NODE_ENV=development
TZ=America/Sao_Paulo                 # Timezone configurado
RUN_MIGRATIONS=false                 # Executar migrations na inicialização
```

**Nota**: Estas variáveis estão configuradas automaticamente no `docker-compose.yml` e `.env.example`.

## Arquivos de Configuração

- **ormconfig.js**: Configuração para CLI do TypeORM
- **ormconfig.ts**: Configuração para aplicação NestJS
- Ambos apontam para o mesmo diretório: `src/core/database/migrations/`

---

**Nota**: Sempre teste suas migrations em ambiente de desenvolvimento antes de aplicar em produção!
