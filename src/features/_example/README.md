# Exemplo de Feature: Employee Management

Este é um exemplo completo de implementação de uma feature no template, demonstrando as melhores práticas e padrões de arquitetura.

## 📋 Sobre o Exemplo

Implementa um sistema simples de **lista telefônica de colaboradores** com os seguintes recursos:

- **CRUD completo** para funcionários (Employee)
- **Relacionamento 1:N** - Um colaborador pode ter múltiplos ramais
- **Validação** de dados com class-validator
- **DTOs** específicos para cada operação
- **Paginação** nas listagens
- **Documentação Swagger** automática

## 🏗️ Estrutura da Feature

```
employees/
├── employees.module.ts           # Módulo principal
├── create-employee/              # Operação CREATE
│   ├── create-employee.controller.ts
│   ├── create-employee.dto.ts
│   └── create-employee.service.ts
├── delete-employee/              # Operação DELETE
├── find-employee/                # Operação READ (single)
├── list-employees/               # Operação READ (list)
├── update-employee/              # Operação UPDATE
└── shared/
    └── repositories/
        └── employee.repository.ts

shared/entities/
├── employee.entity.ts            # Entidade principal
└── extension_number.entity.ts    # Entidade relacionada
```

## 🔄 Relacionamentos

- **Employee** (1) → (N) **Extension Numbers**
- Um funcionário pode ter múltiplos ramais
- Cada ramal pertence a apenas um funcionário

## 🚀 Como Usar Este Exemplo

### 1. Execute as Migrations

```bash
make shell
npm run migration:run
```

### 2. Teste a API

Acesse: http://localhost:3000/api

Endpoints disponíveis:

- `GET /employees` - Listar funcionários (com paginação)
- `GET /employees/:id` - Buscar funcionário por ID
- `POST /employees` - Criar funcionário
- `PUT /employees/:id` - Atualizar funcionário
- `DELETE /employees/:id` - Remover funcionário

### 3. Exemplo de Dados

```json
{
  "name": "João Silva",
  "email": "joao.silva@empresa.com",
  "extensionNumbers": [
    {
      "number": "1001",
      "description": "Ramal Principal"
    },
    {
      "number": "1002",
      "description": "Ramal Secundário"
    }
  ]
}
```

## 📚 Padrões Demonstrados

### 1. Vertical Slice Architecture

- Cada operação (create, read, update, delete) em sua própria pasta
- Isolamento de responsabilidades
- Facilita manutenção e testes

### 2. DTOs Específicos

- `CreateEmployeeDto` - Validações para criação
- `ListEmployeesQueryDto` - Parâmetros de paginação
- `UpdateEmployeeDto` - Validações para atualização

### 3. Repository Pattern

- `EmployeeRepository` - Abstrai acesso aos dados
- Queries otimizadas com relacionamentos
- Facilita testes unitários

### 4. Validações

- Class-validator para DTOs
- Decorators do Swagger
- Mensagens de erro padronizadas

### 5. Tratamento de Erros

- Exception filters globais
- Respostas padronizadas
- Status codes apropriados

## ⚠️ Importante

**Este é apenas um exemplo!**

Quando iniciar seu projeto real:

1. ✅ **Estude** esta implementação
2. ✅ **Copie** os padrões que desejar
3. ❌ **Delete** esta pasta `_example`
4. ❌ **Remove** as migrations de exemplo
5. ✅ **Crie** suas próprias features baseadas nestes padrões

## 🧪 Executar Testes

```bash
make test        # Testes unitários
make test-e2e    # Testes de integração
```

---

**💡 Dica**: Use este exemplo como referência para implementar suas próprias features seguindo os mesmos padrões de arquitetura e organização.
