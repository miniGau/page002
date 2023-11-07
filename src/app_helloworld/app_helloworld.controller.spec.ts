import { Test, TestingModule } from '@nestjs/testing';
import { AppHelloworldController } from './app_helloworld.controller';

describe('AppHelloworldController', () => {
  let controller: AppHelloworldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppHelloworldController],
    }).compile();

    controller = module.get<AppHelloworldController>(AppHelloworldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
