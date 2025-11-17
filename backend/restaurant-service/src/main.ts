import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');

  const corsConfig = configService.get<string>('CORS_ORIGIN');
  const defaultOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
  ];
  let allowedOrigins: string[] | string = corsConfig
    ? corsConfig
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean)
    : defaultOrigins;

  if (Array.isArray(allowedOrigins)) {
    if (allowedOrigins.includes('*')) {
      allowedOrigins = '*';
    } else if (allowedOrigins.length === 0) {
      allowedOrigins = defaultOrigins;
    }
  }

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port = Number(configService.get('REST_PORT')) || 5002;
  await app.listen(port);
  console.log(`🚀 Restaurant Service running on http://localhost:${port}`);
}
bootstrap();
