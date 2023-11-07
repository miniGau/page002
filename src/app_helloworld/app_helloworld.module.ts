import { Module } from '@nestjs/common';
import { AppHelloworldService } from './app_helloworld.service';
import { AppHelloworldController } from './app_helloworld.controller';
import { AppAuthModule } from 'src/app_auth/app_auth.module';

@Module({
    imports:[AppAuthModule],
    providers:[AppHelloworldService],
    controllers:[AppHelloworldController],
})

export class AppHelloworldModule {}
