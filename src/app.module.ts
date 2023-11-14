import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppAuthModule } from './app_auth/app_auth.module';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TraceMiddleware } from './common/trace.middleware';
import { AllExceptionsFilter } from './common/exception.filter';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { getTraceId } from './common/cls';
import { AppUserModule } from './app_user/app_user.module';
import { AppHelloworldModule } from './app_helloworld/app_helloworld.module';
import { RspFormatInterceptor } from './common/rspfmt.interceptor';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import configuration from './config/config';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { AppController } from './app.controller';

@Module({
  imports: [
    // 加载配置
    ConfigModule.forRoot({
      load: [configuration],
    }),

    // 加载日志
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss.SSS',
        }),
        winston.format.printf(({ timestamp, message, ...info }) => {
          const traceId = getTraceId();
          const parts = __filename.split('/');
          const fn = parts[parts.length - 1] + '/' + parts.pop();
          const str = `${timestamp} ${JSON.stringify(info)} ${fn} ${
            process.pid
          } ${traceId} \t ${message}`;
          return str;
        }),
      ),
      defaultMeta: { service: 'user-service' },
      transports: [new winston.transports.Console()],
    }),

    AzureCosmosDbModule.forRoot({
      dbName: process.env.db_name,
      endpoint: process.env.endpoint,
      key: 'your_azure_cosmosdb_primary_key',
    }),

    AppAuthModule,
    AppUserModule,
    AppHelloworldModule,
  ],

  controllers: [AppController],

  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },

    {
      provide: APP_INTERCEPTOR,
      useClass: RspFormatInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceMiddleware).forRoutes('*'); // 注册trace
  }
}
