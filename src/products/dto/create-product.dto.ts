import { IsEnum, IsNumber, IsOptional, MinLength } from 'class-validator';

export class CreateProductDto {
  @MinLength(3)
  readonly name: string;

  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsEnum(['drinks', 'food'], { message: 'Use correct product type!' })
  readonly type?: string;
}
