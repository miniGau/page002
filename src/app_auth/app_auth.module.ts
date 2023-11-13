import { Module } from '@nestjs/common';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { AppAuthController } from './app_auth.controller';
import { AppAuthService } from './app_auth.service';
import { AuthEntity } from 'dto/auth/auth.entity';

@Module({
  imports: [
    AzureCosmosDbModule.forFeature([
      { collection: 'auth_history', dto: AuthEntity },
    ]),
  ],
  providers: [AppAuthService],
  controllers: [AppAuthController],
  exports: [AppAuthService],
})
export class AppAuthModule {}
