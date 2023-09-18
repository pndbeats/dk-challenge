import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const newProductDto = {
        id: 4,
        name: 'Test Product',
        price: 15.88,
        type: 'food',
      };
      const createdNewProduct: CreateProductDto = {
        ...newProductDto,
      };
      const result = await service.create(createdNewProduct);
      expect(result).toEqual(createdNewProduct);
    });
  });
});
