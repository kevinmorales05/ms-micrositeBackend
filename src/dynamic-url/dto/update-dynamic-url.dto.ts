import { PartialType } from '@nestjs/mapped-types';
import { CreateDynamicUrlDto } from './create-dynamic-url.dto';

export class UpdateDynamicUrlDto extends PartialType(CreateDynamicUrlDto) {}
