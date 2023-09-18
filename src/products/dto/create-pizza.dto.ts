import { CreateProductDto } from './create-product.dto';
import { IsArray, IsEnum, IsOptional } from 'class-validator';

export class CreatePizzaDto extends CreateProductDto {
  @IsOptional()
  @IsArray({ message: 'Please provide toppings!' })
  readonly toppings?: string[];

  @IsEnum(['italian', 'regular', 'american'])
  readonly base: string;
}
