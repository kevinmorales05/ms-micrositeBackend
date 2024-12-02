import { IsNotEmpty, IsNumber, IsString, IsArray, ArrayNotEmpty, IsOptional } from 'class-validator';
import { Item } from 'src/types/interfaces';

export class CreateDynamicUrlDto {
  @IsNotEmpty()
  @IsString()
  merchantCode: string;
  
  @IsOptional()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  merchantName: string;

  @IsNotEmpty()
  @IsString()
  purchaseId: string;

  @IsNotEmpty()
  @IsNumber()
  subtotal: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;

  @IsNotEmpty()
  @IsNumber()
  taxesPercentage: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  purchaseItems: Item[]; // Ensuring this is always an array
}
