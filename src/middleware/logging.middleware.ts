import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: any, res: any, next: () => void) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const elapsed = Date.now() - start;
      this.logger.log(
        `${statusMessage} ${method} ${originalUrl} ${statusCode} - ${elapsed}ms`,
      );
    });

    next();
  }
}
