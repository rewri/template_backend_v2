# TODO: Implementação de Autenticação JWT

## 📋 Estrutura de Banco de Dados

### Tabelas Essenciais

#### 1. **users**

```sql
- id (PK, UUID ou INT AUTO_INCREMENT)
- email (UNIQUE, VARCHAR)
- password_hash (VARCHAR)
- first_name (VARCHAR)
- last_name (VARCHAR)
- is_active (BOOLEAN, default TRUE)
- email_verified_at (TIMESTAMP, nullable)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 2. **roles** (RBAC - Role Based Access Control)

```sql
- id (PK, INT)
- name (VARCHAR, UNIQUE) - ex: 'admin', 'user', 'moderator'
- description (VARCHAR, nullable)
- created_at (TIMESTAMP)
```

#### 3. **user_roles**

```sql
- id (PK, INT)
- user_id (FK para users)
- role_id (FK para roles)
- created_at (TIMESTAMP)
```

#### 4. **refresh_tokens**

```sql
- id (PK, UUID)
- user_id (FK para users)
- token_hash (VARCHAR) - hash do refresh token
- expires_at (TIMESTAMP)
- revoked_at (TIMESTAMP, nullable)
- device_info (JSON, nullable) - user agent, IP, etc
- created_at (TIMESTAMP)
```

#### 5. **password_resets**

```sql
- id (PK, UUID)
- user_id (FK para users)
- token_hash (VARCHAR)
- expires_at (TIMESTAMP)
- used_at (TIMESTAMP, nullable)
- created_at (TIMESTAMP)
```

### Tabelas de Segurança

#### 6. **login_attempts**

```sql
- id (PK, INT)
- email (VARCHAR)
- ip_address (VARCHAR)
- success (BOOLEAN)
- attempted_at (TIMESTAMP)
```

#### 7. **email_verifications**

```sql
- id (PK, UUID)
- user_id (FK para users)
- token_hash (VARCHAR)
- expires_at (TIMESTAMP)
- verified_at (TIMESTAMP, nullable)
- created_at (TIMESTAMP)
```

---

## 🏗️ Estrutura de Arquivos

```
src/
├── features/
│   └── auth/
│       ├── auth.module.ts
│       ├── auth.controller.ts
│       ├── auth.service.ts
│       ├── dto/
│       │   ├── login.dto.ts
│       │   ├── register.dto.ts
│       │   ├── refresh-token.dto.ts
│       │   ├── forgot-password.dto.ts
│       │   └── reset-password.dto.ts
│       ├── guards/
│       │   ├── jwt-auth.guard.ts
│       │   ├── local-auth.guard.ts
│       │   └── roles.guard.ts
│       ├── strategies/
│       │   ├── jwt.strategy.ts
│       │   └── local.strategy.ts
│       ├── decorators/
│       │   ├── current-user.decorator.ts
│       │   └── roles.decorator.ts
│       └── services/
│           ├── password.service.ts
│           └── email-verification.service.ts
├── core/
│   └── shared/
│       └── entities/
│           ├── user.entity.ts
│           ├── role.entity.ts
│           ├── user-role.entity.ts
│           ├── refresh-token.entity.ts
│           ├── password-reset.entity.ts
│           ├── login-attempt.entity.ts
│           └── email-verification.entity.ts
```

---

## 📦 Dependências Necessárias

```bash
npm install @nestjs/passport @nestjs/jwt passport passport-local passport-jwt bcryptjs
npm install -D @types/passport-local @types/passport-jwt @types/bcryptjs
```

---

## 🔧 Passo-a-Passo de Implementação

### **Fase 1: Setup Base**

1. [ ] **Instalar dependências**

   ```bash
   npm install @nestjs/passport @nestjs/jwt passport passport-local passport-jwt bcryptjs
   npm install -D @types/passport-local @types/passport-jwt @types/bcryptjs
   ```

2. [ ] **Configurar variáveis de ambiente (.env)**
   ```env
   JWT_SECRET=your_super_secret_key_here
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_SECRET=your_refresh_secret_key_here
   JWT_REFRESH_EXPIRES_IN=7d
   ```

### **Fase 2: Entidades e Migrations**

3. [ ] **Criar entidades TypeORM**
   - User entity
   - Role entity
   - UserRole entity (many-to-many)
   - RefreshToken entity
   - PasswordReset entity
   - LoginAttempt entity
   - EmailVerification entity

4. [ ] **Criar migrations**

   ```bash
   npm run migration:create src/core/database/migrations/CreateAuthTables
   ```

5. [ ] **Executar migrations**
   ```bash
   npm run migration:run
   ```

### **Fase 3: Serviços Base**

6. [ ] **Criar PasswordService**
   - Hash de senhas com bcrypt
   - Comparação de senhas
   - Geração de tokens seguros

7. [ ] **Criar AuthService**
   - Validação de usuário (email/senha)
   - Geração de JWT tokens
   - Refresh token logic
   - Gerenciamento de login attempts

### **Fase 4: Strategies e Guards**

8. [ ] **Implementar LocalStrategy**
   - Validação email/senha
   - Integração com AuthService

9. [ ] **Implementar JwtStrategy**
   - Validação de access tokens
   - Extração de payload

10. [ ] **Criar Guards**
    - JwtAuthGuard (proteção de rotas)
    - LocalAuthGuard (login)
    - RolesGuard (autorização por roles)

### **Fase 5: Controllers e DTOs**

11. [ ] **Criar DTOs de validação**
    - LoginDto
    - RegisterDto
    - RefreshTokenDto
    - ForgotPasswordDto
    - ResetPasswordDto

12. [ ] **Implementar AuthController**
    - POST /auth/register
    - POST /auth/login
    - POST /auth/refresh
    - POST /auth/logout
    - POST /auth/forgot-password
    - POST /auth/reset-password
    - POST /auth/verify-email

### **Fase 6: Funcionalidades Avançadas**

13. [ ] **Rate Limiting para Auth**
    - Aplicar rate limiting nos endpoints de auth
    - Configurar limites específicos para login

14. [ ] **Email Verification Service**
    - Geração de tokens de verificação
    - Envio de emails (integração com provider)
    - Verificação de tokens

15. [ ] **Login Attempts Tracking**
    - Registrar tentativas de login
    - Bloqueio temporário por IP/email
    - Limpeza automática de logs antigos

### **Fase 7: Segurança e Otimização**

16. [ ] **Implementar Decorators**
    - @CurrentUser() - extrair usuário atual
    - @Roles() - definir roles necessárias
    - @Public() - marcar rotas públicas

17. [ ] **Jobs de Limpeza**
    - Remover refresh tokens expirados
    - Limpar password resets expirados
    - Limpar email verifications expirados
    - Limpar login attempts antigos

18. [ ] **Middleware de Segurança**
    - Headers de segurança (Helmet)
    - CORS adequado
    - Sanitização de inputs

### **Fase 8: Testes**

19. [ ] **Testes Unitários**
    - AuthService
    - PasswordService
    - Guards e Strategies

20. [ ] **Testes E2E**
    - Fluxo completo de registro
    - Fluxo de login/logout
    - Refresh de tokens
    - Recuperação de senha

---

## 🔒 Estratégia de Tokens

### **Access Tokens**

- ❌ **NÃO armazenar no DB** (stateless)
- ⏰ Curta duração (15-30 min)
- 📋 Contém: user_id, roles, exp, iat

### **Refresh Tokens**

- ✅ **Armazenar hash no DB** (tabela refresh_tokens)
- ⏰ Longa duração (7-30 dias)
- 🔄 Permite revogação e controle de sessões

---

## 🗃️ Índices Recomendados

```sql
-- Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);

-- Limpeza automática
CREATE INDEX idx_password_resets_expires_at ON password_resets(expires_at);
CREATE INDEX idx_login_attempts_attempted_at ON login_attempts(attempted_at);
CREATE INDEX idx_email_verifications_expires_at ON email_verifications(expires_at);
```

---

## 📋 Checklist Final

- [ ] Todas as entidades criadas e migrations executadas
- [ ] JWT configurado com secrets seguros
- [ ] Rate limiting aplicado aos endpoints de auth
- [ ] Testes unitários e E2E implementados
- [ ] Jobs de limpeza configurados
- [ ] Documentação da API (Swagger) atualizada
- [ ] Logs de auditoria implementados
- [ ] Monitoramento de tentativas de login suspeitas

---

## 🚀 Endpoints da API

```
POST   /auth/register          - Registro de usuário
POST   /auth/login             - Login
POST   /auth/refresh           - Renovar access token
POST   /auth/logout            - Logout (revoga refresh token)
POST   /auth/forgot-password   - Solicitar reset de senha
POST   /auth/reset-password    - Resetar senha
POST   /auth/verify-email      - Verificar email
GET    /auth/me                - Dados do usuário logado
```

---

## ⚠️ Considerações de Segurança

1. **Secrets**: Usar secrets fortes e diferentes para JWT e refresh tokens
2. **Rate Limiting**: Especialmente crítico para login e registro
3. **HTTPS**: Sempre usar HTTPS em produção
4. **Sanitização**: Validar e sanitizar todos os inputs
5. **Logs**: Registrar atividades suspeitas
6. **Backup**: Plano de backup para tokens críticos
7. **Rotação**: Rotacionar secrets periodicamente
