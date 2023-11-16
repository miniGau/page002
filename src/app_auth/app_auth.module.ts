import { Module } from '@nestjs/common';
import { AzureCosmosDbModule } from '@nestjs/azure-database';
import { AppAuthController } from './app_auth.controller';
import { AppAuthService } from './app_auth.service';
import { TbUserName, User } from 'dto/auth/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AzureCosmosDbModule.forFeature([{ collection: TbUserName, dto: User }]),
    JwtModule.register({
      global: true,
      secret: process.env.jwt_token,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AppAuthService],
  controllers: [AppAuthController],
  exports: [AppAuthService],
})
export class AppAuthModule {}
