import { Module } from '@nestjs/common';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { AppAuthController } from './app_auth.controller';
import { AppAuthService } from './app_auth.service';
import { User } from 'dto/auth/user.entity';

@Module({
  imports: [
    AzureCosmosDbModule.forFeature([{ collection: 'user_info', dto: User }]),
  ],
  providers: [AppAuthService],
  controllers: [AppAuthController],
  exports: [AppAuthService],
})
export class AppAuthModule {}
