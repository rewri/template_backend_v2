# Contribuindo para o Backend API

Obrigado por considerar contribuir para este projeto! Aqui estão algumas diretrizes para ajudar você a contribuir de forma efetiva.

## 📋 Antes de Contribuir

- Verifique se já existe uma issue relacionada ao problema que você quer resolver
- Se não existir, crie uma issue descrevendo o problema ou a funcionalidade proposta
- Aguarde feedback antes de começar a trabalhar em grandes mudanças

## 🔄 Processo de Contribuição

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork localmente
git clone https://github.com/SEU-USUARIO/backend.git
cd backend

# Adicione o repositório original como upstream
git remote add upstream https://github.com/USUARIO-ORIGINAL/backend.git
```

### 2. Configuração do Ambiente

```bash
# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute os testes para garantir que tudo está funcionando
npm test
```

### 3. Crie uma Branch

```bash
# Crie uma branch para sua feature/bugfix
git checkout -b feature/nome-da-sua-feature
# ou
git checkout -b fix/nome-do-bugfix
```

### 4. Faça suas Alterações

- Mantenha o código limpo e bem documentado
- Siga os padrões de código existentes
- Adicione testes para novas funcionalidades
- Atualize a documentação se necessário

### 5. Teste suas Alterações

```bash
# Execute os testes
npm test
npm run test:e2e

# Verifique o linting
npm run lint

# Execute a aplicação localmente
npm run start:dev
```

### 6. Commit e Push

```bash
# Adicione suas alterações
git add .

# Faça um commit com uma mensagem descritiva
git commit -m "feat: adiciona nova funcionalidade X"

# Push para seu fork
git push origin feature/nome-da-sua-feature
```

### 7. Crie um Pull Request

- Vá para o GitHub e crie um Pull Request
- Descreva claramente as alterações feitas
- Referencie a issue relacionada (se houver)
- Aguarde o review e feedback

## 📝 Padrões de Código

### Commits

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` para novas funcionalidades
- `fix:` para correções de bugs
- `docs:` para alterações na documentação
- `style:` para mudanças de formatação
- `refactor:` para refatorações
- `test:` para adição/modificação de testes
- `chore:` para tarefas de manutenção

### TypeScript

- Use TypeScript estrito
- Defina tipos explícitos sempre que possível
- Use interfaces para objetos complexos
- Documente funções públicas com JSDoc

### Testes

- Escreva testes para todas as funcionalidades públicas
- Mantenha cobertura de testes acima de 80%
- Use nomes descritivos para os testes
- Organize testes em `describe` blocks lógicos

### NestJS

- Siga as convenções do NestJS
- Use decorators apropriados
- Implemente validação com class-validator
- Use DTOs para entrada e saída de dados

## 🐛 Reportando Bugs

Ao reportar bugs, inclua:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Versão do Node.js e sistema operacional
- Screenshots (se aplicável)

## 💡 Sugerindo Funcionalidades

Para sugerir funcionalidades:

- Descreva claramente o caso de uso
- Explique como isso beneficiaria o projeto
- Considere a complexidade da implementação
- Proponha uma API ou interface

## ❓ Dúvidas

Se você tiver dúvidas:

- Verifique a documentação existente
- Procure em issues fechadas
- Abra uma nova issue com a label "question"

## 📜 Código de Conduta

- Seja respeitoso com outros contribuidores
- Aceite feedback construtivo
- Foque no que é melhor para o projeto
- Mantenha discussões focadas e técnicas

Obrigado por contribuir! 🎉