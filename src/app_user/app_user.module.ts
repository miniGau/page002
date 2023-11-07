import { Module } from '@nestjs/common';
import { AppUserController } from './app_user.controller';
import { AppUserService } from './app_user.service';

@Module({
  controllers: [AppUserController],
  providers: [AppUserService]
})
export class AppUserModule {}
