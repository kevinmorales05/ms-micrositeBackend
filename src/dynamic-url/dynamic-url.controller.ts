import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DynamicUrlService } from './dynamic-url.service';
import { CreateDynamicUrlDto } from './dto/create-dynamic-url.dto';
import { UpdateDynamicUrlDto } from './dto/update-dynamic-url.dto';

@Controller('dynamic-url')
export class DynamicUrlController {
  constructor(private readonly dynamicUrlService: DynamicUrlService) {}

  @Post()
  create(@Body() createDynamicUrlDto: CreateDynamicUrlDto) {
    return this.dynamicUrlService.create(createDynamicUrlDto);
  }

  @Get()
  findAll() {
    return this.dynamicUrlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dynamicUrlService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDynamicUrlDto: UpdateDynamicUrlDto,
  ) {
    return this.dynamicUrlService.update(+id, updateDynamicUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dynamicUrlService.remove(+id);
  }
}
