import { Module } from '@nestjs/common';
import { AppHelloworldController } from './app_helloworld.controller';
import { AppHelloworldService } from './app_helloworld.service';

@Module({
  controllers: [AppHelloworldController],
  providers: [AppHelloworldService]
})
export class AppHelloworldModule {}
