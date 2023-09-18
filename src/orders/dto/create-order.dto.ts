export class CreateOrderDto {
  customerId: number;
  productIds: number[];
  quantity?: number;
}
