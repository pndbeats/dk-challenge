import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const newProductDto = {
        name: 'Test Product',
        price: 15.88,
        type: 'food',
      };
      const createdNewProduct = {
        id: 4,
        ...newProductDto,
      };
      // jest.spyOn(productService, 'createProduct').mockResolvedValue(createdNewProduct as any);
      const result = await controller.create(createdNewProduct);
      expect(result).toEqual(createdNewProduct);
    });
  });
});
