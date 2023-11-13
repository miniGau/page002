import {
  Controller,
  Post,
  Inject,
  Get,
  Render,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { loginRsp } from 'proto/auth/login';
import { AppAuthService } from './app_auth.service';
import { Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { GoogleOauthGuard } from './google-oauth.guard';
import { Container } from '@azure/cosmos';
import { AuthEntity } from 'dto/auth/auth.entity';
import { InjectModel } from '@nestjs/azure-database';

@Controller('auth')
export class AppAuthController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @InjectModel(AuthEntity) private readonly carContainer: Container,
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
  }

  @Get()
  @Render('login.ejs')
  root() {
    return { user: 'xiaoming' };
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.status(HttpStatus.OK);
  }
}
