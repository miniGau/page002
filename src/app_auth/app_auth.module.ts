import { Module } from '@nestjs/common';
import { AppAuthController } from './app_auth.controller';
import { AppAuthService } from './app_auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WxAccessToken } from 'dto/auth/wx_access_token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WxAccessToken])],
  providers: [AppAuthService],
  controllers: [AppAuthController],
  exports:[AppAuthService]
})
export class AppAuthModule {

}

