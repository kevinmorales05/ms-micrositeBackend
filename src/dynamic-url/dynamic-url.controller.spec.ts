import { Test, TestingModule } from '@nestjs/testing';
import { DynamicUrlController } from './dynamic-url.controller';
import { DynamicUrlService } from './dynamic-url.service';

describe('DynamicUrlController', () => {
  let controller: DynamicUrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DynamicUrlController],
      providers: [DynamicUrlService],
    }).compile();

    controller = module.get<DynamicUrlController>(DynamicUrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
