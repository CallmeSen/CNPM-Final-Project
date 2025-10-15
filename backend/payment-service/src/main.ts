import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const frontendOrigin =
    configService.get('FRONTEND_ORIGIN') ?? 'http://localhost:3000';

  app.enableCors({
    origin: frontendOrigin,
    credentials: true,
  });

  const stripeWebhookPath = '/api/payment/webhook';

  app.use(
    json({
      verify: (req: any, _res, buf) => {
        if (req.originalUrl === stripeWebhookPath) {
          req.rawBody = buf;
        }
      },
    }),
  );

  app.use(
    urlencoded({
      extended: true,
      verify: (req: any, _res, buf) => {
        if (req.originalUrl === stripeWebhookPath) {
          req.rawBody = buf;
        }
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port = Number(configService.get('PAY_PORT')) || 5004;
  await app.listen(port);
  console.log(`🚀 Payment Service running on http://localhost:${port}`);
}

bootstrap();
