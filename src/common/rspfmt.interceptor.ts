import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { getTraceId } from './cls';
import { logger } from './xlog';

const retcodeFields = ['errcode', 'retcode', 'code'];
const messageFields = ['errmsg', 'message'];

const getValue = (data: Object, fieldNames: string[]): string => {
  const fieldName = fieldNames.find((name) => data[name] !== undefined);
  return data[fieldName] || '';
};

export class RspFormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const http = context.switchToHttp();
    const res = http.getResponse();
    const req = http.getRequest();

    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        if (data.status) {
          res.status(data.status);
        }

        console.log(
          `reqId:${getTraceId()} req:${JSON.stringify(req.body)} rsp:${JSON.stringify(data)} cost:${
            Date.now() - now
          }ms`,
        );
        return data.body
          ? data.body
          : {
              retcode: getValue(data, retcodeFields) || 0,
              message: getValue(data, messageFields) || 'OK',
              data,
              traceId: getTraceId(),
            };
      }),
    );
  }
}
