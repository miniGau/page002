import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppAuthModule } from './app_auth/app_auth.module';
import { AppUserModule } from './app_user/app_user.module';
import { AppHelloworldModule } from './app_helloworld/app_helloworld.module';

@Module({
  imports: [AppAuthModule, AppUserModule, AppHelloworldModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
