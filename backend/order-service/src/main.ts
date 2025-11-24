import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MetricsMiddleware } from './common/metrics.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Apply metrics middleware globally
  app.use(new MetricsMiddleware().use.bind(new MetricsMiddleware()));

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = Number(configService.get('ORDER_PORT')) || 5005;

  await app.listen(port);
  console.log(`🚀 Order Service running on http://localhost:${port}`);
}
bootstrap();
