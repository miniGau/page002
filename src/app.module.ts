import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppAuthModule } from './app_auth/app_auth.module';
import { AppUserModule } from './app_user/app_user.module';

@Module({
  imports: [AppAuthModule, AppUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
