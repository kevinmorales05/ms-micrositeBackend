import { Test, TestingModule } from '@nestjs/testing';
import { DynamicUrlService } from './dynamic-url.service';

describe('DynamicUrlService', () => {
  let service: DynamicUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicUrlService],
    }).compile();

    service = module.get<DynamicUrlService>(DynamicUrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
