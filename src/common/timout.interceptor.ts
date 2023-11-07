import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

const Tmo = 6000

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const timeout = this.reflector.get<number>('request-timeout', context.getHandler()) || Tmo;
    response.setTimeout(timeout )

    return next.handle();
  };
};

const SetTimeout = (timeout: number) => SetMetadata('request-timeout', timeout);

export function SetRequestTimeout(timeout: number = Tmo) {
    console.log("timeout:", timeout);
    return applyDecorators(
        SetTimeout(timeout),
        UseInterceptors(TimeoutInterceptor),
    );
}