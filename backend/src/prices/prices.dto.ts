import { IsString, IsNumber, IsBoolean, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PriceQueryDto {
  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  processingType?: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsString()
  @IsOptional()
  q?: string;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  inStock?: boolean;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  maxPrice?: number;
}

export class CreatePriceItemDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsString()
  processingType: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @IsOptional()
  minOrder?: number;

  @IsBoolean()
  @IsOptional()
  inStock?: boolean;
}
