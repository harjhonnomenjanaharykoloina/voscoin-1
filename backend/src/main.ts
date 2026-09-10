import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('NextCRM-Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Security Headers
  app.use(helmet());

  // Global Prefix
  app.setGlobalPrefix('api/v1');

  // Strict CORS
  const corsOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:4200').split(',');
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Workspace-Id'],
  });

  // Global Validation Pipe with strict whitelisting to reject unknown properties & NoSQL injections
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Centralized Safe Exception Filter
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = parseInt(process.env.PORT || '4000', 10);
  await app.listen(port);
  logger.log(`NextCRM NestJS Backend running on port ${port} [Env: ${process.env.NODE_ENV || 'development'}]`);
}

bootstrap();
