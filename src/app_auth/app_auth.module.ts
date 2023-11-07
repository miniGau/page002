import { Module } from '@nestjs/common';
import { AppAuthController } from './app_auth.controller';
import { AppAuthService } from './app_auth.service';

@Module({
  controllers: [AppAuthController],
  providers: [AppAuthService]
})
export class AppAuthModule {}
