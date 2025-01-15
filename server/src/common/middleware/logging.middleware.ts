import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    // Log the incoming request
    this.logger.log(
      `Request: ${method} ${originalUrl} - UA: ${userAgent} - IP: ${ip}`,
    );

    // Optionally log again when the response is finished
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(`Response: ${method} ${originalUrl} => Status: ${statusCode}`);
    });

    next();
  }
}
