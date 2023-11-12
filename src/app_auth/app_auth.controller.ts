import { Controller, Post, Inject, Get, Render } from '@nestjs/common';
import { loginRsp } from 'proto/auth/login';
import { AppAuthService } from './app_auth.service';
import { Req } from '@nestjs/common';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import * as passport from 'passport';
import { get } from 'http';

@Controller('auth')
export class AppAuthController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly authService: AppAuthService,
  ) {}

  @Post('login')
  async login(@Req() request: Request): Promise<loginRsp> {
    console.log('login---->');
    this.logger.info('login:>>>');
    if (request.cookies == null) {
      this.logger.warn('login cookie is null');
      return;
    }

    const uid = request.cookies['uid'];
    const token = request.cookies['access_token'];
    const bid = request.cookies['bid'];

    if (uid == null || token == null) {
      this.logger.warn('login uid ${uid} or token ${token} is nil');
      return;
    }

    const authObj = await this.authService.signIn(bid, uid, token);
    this.logger.info(
      `login uid: ${uid} token ${token} auth obj: ${JSON.stringify(authObj)}`,
    );

    return authObj;
  }

  @Get()
  @Render('login.ejs')
  root() {
    return { user: 'xiaoming' };
  }

  facebook() {}
}
