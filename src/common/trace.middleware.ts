/*
 * 全链路监控日志信息
 */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as cls from 'cls-hooked';
import * as uuid from 'node-uuid';

const traceStorage = cls.createNamespace('traceStorage');

@Injectable()
export class TraceMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    traceStorage.run(() => {
      const traceId = req.headers['X-Request-Id'] || req.headers['x-api-requestid'] || uuid.v4();
      traceStorage.set('traceId', traceId);
      return next();
    });
  }
}
