import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppAuthModule } from './app_auth/app_auth.module';
import { NestModule,MiddlewareConsumer } from '@nestjs/common';
import { TraceMiddleware } from './common/trace.middleware';
import {AllExceptionsFilter} from "./common/exception.filter"
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { getTraceId } from './common/cls';
import { AppUserModule } from './app_user/app_user.module';
import { AppHelloworldModule } from './app_helloworld/app_helloworld.module';
import { RspFormatInterceptor } from './common/rspfmt.interceptor';
import { APP_INTERCEPTOR , APP_FILTER} from '@nestjs/core';
import * as redisStore from 'cache-manager-ioredis';
import { RedisModule} from 'nestjs-redis'
import config from './config/config';

// 配置模块
export const configModule = ConfigModule.forRoot({
  ignoreEnvFile: true,
  // 全局注入配置
  isGlobal: true,
  load: [() => config],
});


@Module({
  imports: [
  // 加载配置
  ConfigModule.forRoot({load:[config]}), 

  // 加载数据库
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => { return{
      type: 'mysql',
      host: configService.get('server.auth.db.host'),
      port: +configService.get('server.auth.db.port'),
      username: configService.get('server.auth.db.username'),
      password: configService.get('server.auth.db.password'),
      database: configService.get('server.auth.db.database'),
      autoLoadEntities: true,
      synchronize: true,
    }},
  }), 

  // redis
  RedisModule.forRootAsync({
    useFactory: async (configService: ConfigService) => {
      const { host, port, password } = configService.get('server.auth.redis');
      if (host) {
        return;
      }
      return {
        store: redisStore,
        host,
        port,
        password,
      };
    },
    inject: [ConfigService],
  }),
  
  // 加载日志
  WinstonModule.forRoot({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss.SSS',
      }),
      winston.format.printf(({ timestamp, message, ...info }) => {
          let traceId = getTraceId();
          let parts = __filename.split('/');
          let fn = parts[parts.length - 1] + '/' + parts.pop();
          const str = `${timestamp} ${JSON.stringify(info)} ${fn} ${process.pid} ${traceId} \t ${message}`;
          return str;
      })),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logs/server.log' }),
    ],
  }),
  AppAuthModule,
  AppUserModule,
  AppHelloworldModule,
  ],

  controllers: [],

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
    consumer.apply(TraceMiddleware).forRoutes("*"); // 注册trace 
  }
}

