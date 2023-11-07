import { Module } from '@nestjs/common';
import { AppAuthController } from './app_auth.controller';
import { AppAuthService } from './app_auth.service';
@Module({
  imports: [],
  providers: [AppAuthService],
  controllers: [AppAuthController],
  exports: [AppAuthService],
})
export class AppAuthModule {}
