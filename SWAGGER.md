# Documentação da API com Swagger

## Visão Geral

Este projeto utiliza o Swagger/OpenAPI 3.0 para documentação automática da API. A documentação é gerada automaticamente baseada nos decorators do NestJS.

## Acessando a Documentação

Após iniciar a aplicação, a documentação estará disponível em:

- **URL**: `http://localhost:3000/api/docs`
- **JSON Schema**: `http://localhost:3000/api/docs-json`

## Configuração

### 1. Dependências Instaladas

```bash
npm install --save @nestjs/swagger swagger-ui-express
npm install --save-dev @types/swagger-ui-express
```

### 2. Configuração no main.ts

O Swagger foi configurado no arquivo `src/main.ts` com:

- Título e descrição da API
- Versionamento
- Suporte para autenticação Bearer (JWT)
- Persistência de autorização

### 3. Decorators Utilizados

#### @ApiTags

Agrupa endpoints relacionados na documentação:

```typescript
@ApiTags('Users')
@Controller('users')
export class UsersController {
  // ...
}
```

#### @ApiOperation

Descreve a operação do endpoint:

```typescript
@ApiOperation({ summary: 'Create a new user' })
@Post()
create() {
  // ...
}
```

#### @ApiResponse

Define as possíveis respostas:

```typescript
@ApiResponse({
  status: 201,
  description: 'User created successfully',
  type: UserDto
})
```

#### @ApiProperty (em DTOs)

Documenta propriedades dos DTOs:

```typescript
export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100,
  })
  name: string;
}
```

## Estrutura de DTOs

### ApiResponseDto

DTO genérico para padronizar respostas da API:

```typescript
{
  success: boolean,
  message: string,
  data?: T,
  error?: string
}
```

### HealthResponseDto

DTO específico para o endpoint de health check:

```typescript
{
  status: string,
  timestamp: string
}
```

## Exemplos de Uso

### Documentando um Controller Completo

```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Examples')
@Controller('examples')
export class ExamplesController {
  @Get()
  @ApiOperation({ summary: 'List all examples' })
  @ApiResponse({
    status: 200,
    description: 'List retrieved successfully',
    type: [ExampleDto],
  })
  findAll(): ExampleDto[] {
    return [];
  }

  @Post()
  @ApiOperation({ summary: 'Create a new example' })
  @ApiBody({ type: CreateExampleDto })
  @ApiResponse({
    status: 201,
    description: 'Example created successfully',
    type: ExampleDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  create(@Body() createExampleDto: CreateExampleDto): ExampleDto {
    return new ExampleDto();
  }
}
```

### Documentando DTOs com Validação

```typescript
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'securePassword123',
    minLength: 8,
    writeOnly: true,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
```

## Recursos Avançados

### Autenticação JWT

Para endpoints que requerem autenticação, use:

```typescript
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Get('protected')
getProtectedResource() {
  // ...
}
```

### Parâmetros de Query

```typescript
@ApiQuery({
  name: 'page',
  required: false,
  type: Number,
  description: 'Page number for pagination'
})
@Get()
findAll(@Query('page') page?: number) {
  // ...
}
```

### Parâmetros de Rota

```typescript
@ApiParam({
  name: 'id',
  type: 'string',
  description: 'User ID'
})
@Get(':id')
findOne(@Param('id') id: string) {
  // ...
}
```

## Comandos Úteis

```bash
# Iniciar em modo de desenvolvimento
npm run start:dev

# Build da aplicação
npm run build

# Executar testes
npm run test

# Ver documentação
# Acesse: http://localhost:3000/api/docs
```

## Próximos Passos

1. **Adicionar autenticação JWT**: Configure guards e decorators para endpoints protegidos
2. **Criar mais DTOs**: Desenvolva DTOs específicos para cada funcionalidade
3. **Implementar paginação**: Use o `pagination-query.dto.ts` já existente
4. **Adicionar exemplos**: Inclua mais exemplos nas respostas da API
5. **Configurar ambientes**: Adapte a configuração para diferentes ambientes (dev, staging, prod)

## Troubleshooting

### Problema: Decorators não aparecem na documentação

- Verifique se os decorators estão importados corretamente
- Certifique-se de que as classes DTO estão sendo exportadas

### Problema: Tipos não são reconhecidos

- Verifique se as propriedades dos DTOs têm o decorator `@ApiProperty()`
- Confirme que os tipos estão sendo importados no documento Swagger

### Problema: Documentação não carrega

- Verifique se o SwaggerModule está configurado corretamente no main.ts
- Confirme se a aplicação está rodando na porta correta
