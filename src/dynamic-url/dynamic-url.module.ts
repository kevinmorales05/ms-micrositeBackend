import { Module } from '@nestjs/common';
import { DynamicUrlService } from './dynamic-url.service';
import { DynamicUrlController } from './dynamic-url.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicUrl } from './entities/dynamic-url.entity';

@Module({
  controllers: [DynamicUrlController],
  providers: [DynamicUrlService],
  imports: [TypeOrmModule.forFeature([DynamicUrl])],
})
export class DynamicUrlModule {}
