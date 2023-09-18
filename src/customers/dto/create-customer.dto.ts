import { MinLength } from 'class-validator';

export class CreateCustomerDto {
  @MinLength(3)
  name: string;
}
