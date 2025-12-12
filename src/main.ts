import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/shared/filters/http-exception.filter';
import { RateLimitHeadersInterceptor } from './core/shared/interceptors/rate-limit-headers.interceptor';
import { ResponseInterceptor } from './core/shared/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Filtro global para tratamento de exceções
  app.useGlobalFilters(new HttpExceptionFilter());

  // Interceptor global para padronizar respostas de sucesso
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Interceptor para adicionar headers de rate limiting
  app.useGlobalInterceptors(new RateLimitHeadersInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Template Backend API')
    .setDescription(
      'Documentação completa da API do Template Backend desenvolvido com NestJS.',
    )
    .setVersion('1.0.0')
    .addTag('app', 'Endpoints básicos da aplicação')
    .addTag('employees', 'Gerenciamento de funcionários e ramais')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Digite o token JWT',
      in: 'header',
    })
    .addServer('http://localhost:3000', 'Desenvolvimento Local')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    `Swagger documentation is available at: http://localhost:${process.env.PORT ?? 3000}/api/docs`,
  );
}

bootstrap().catch((error) => {
  console.error('Error starting application:', error);
  process.exit(1);
});
