/*
 * 异常错误捕获器
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { logger } from './xlog';
import { getTraceId } from './cls';

// Custom ExceptionsFilter as below only need to catch HttpException; All Other unrecognied Exception
//  will be translated to Internal Server Error Exception
@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const { message, stack } = exception;

    const exceptionResponse = exception.getResponse() as
      | string
      | Record<string, any>;
    const ctx = host.switchToHttp();
    const responseHandler = ctx.getResponse() as Response;
    const request = ctx.getRequest() as Request;
    const trace_id = getTraceId();
    const status = exception.getStatus();

    const reportData = {
      method: request.method,
      url: JSON.stringify(request.url),
      headers: JSON.stringify(request.headers),
      addition: JSON.stringify(request.query),
      addition1: JSON.stringify(request.body),
      trace_id,
    };
    const statusCode = exception.getStatus();
    if (statusCode === HttpStatus.BAD_REQUEST) {
      logger.warn('server_bad_request', '调用方参数请求错误', {
        message,
        stack,
        exceptionResponse,
        reportData,
      });
    } else if (statusCode !== HttpStatus.NOT_FOUND) {
      logger.error('server_unhandler_err', '服务未捕获报错', {
        message,
        stack,
        exceptionResponse,
        reportData,
      });
    }

    // built-in exceptions layer will handles exceptions of type HttpException (and subclasses of it).
    // When an exception is unrecognized (is neither HttpException nor a class that inherits from HttpException),
    // the built-in exception filter generates a 500 Internal server error HttpException.

    // const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const result: Record<string, any> = {
      retcode: status,
      message,
      traceId: getTraceId(),
    };
    if (typeof exceptionResponse !== 'string') {
      if (
        exceptionResponse?.message?.length &&
        exceptionResponse.message !== message
      ) {
        result.details = exceptionResponse.message;
      }
    }
    responseHandler.status(status).json(result);
  }
}
