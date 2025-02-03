import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const startTime = Date.now(); // Capture start time

    this.logger.log(
      `Request: ${method} ${originalUrl} - UA: ${userAgent} - IP: ${ip}`,
    );

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime; // Calculate response time
      this.logger.log(
        `Response: ${method} ${originalUrl} => Status: ${statusCode} (${duration}ms)`,
      );
    });

    next();
  }
}
