import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { httpRequestDuration, httpRequestTotal } from './metrics';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    // Capture response finish event
    res.on('finish', () => {
      const duration = (Date.now() - startTime) / 1000;
      const route = req.route?.path || req.path || 'unknown';
      const method = req.method;
      const statusCode = res.statusCode.toString();

      // Record metrics
      httpRequestDuration.labels(method, route, statusCode).observe(duration);

      httpRequestTotal.labels(method, route, statusCode).inc();
    });

    next();
  }
}
