import { Test, TestingModule } from '@nestjs/testing';
import { AppHelloworldService } from './app_helloworld.service';

describe('AppHelloworldService', () => {
  let service: AppHelloworldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppHelloworldService],
    }).compile();

    service = module.get<AppHelloworldService>(AppHelloworldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
