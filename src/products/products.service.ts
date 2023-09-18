import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { products } from 'src/data/mock-data';
import { CreatePizzaDto } from './dto/create-pizza.dto';
@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    /**
     * TODO: Use validation on DTO
     */

    /** Find if the product already exists */
    const existingProduct = products.find(
      (product) => product.name === createProductDto.name,
    );

    if (existingProduct) {
      throw new BadRequestException(
        `Product with name ${createProductDto.name} already exists!`,
      );
    }
    /**
     * Build new product DTO
     */
    // const newProductId = uuidv4();
    const newProductId = products.length + 1;
    const newProductName = createProductDto.name;
    const newProductPrice = createProductDto.price;
    const newProductType = createProductDto?.type;
    const newProduct = {
      id: newProductId,
      name: newProductName,
      price: newProductPrice,
      type: newProductType,
    };
    products.push(newProduct);
    return newProduct;
  }

  findAll(type?: 'food' | 'drinks') {
    /**
     * TODO: Fetch products from database
     * TODO: Return proper response if there aren't any products
     */
    if (type) {
      return products.filter((product) => product.type === type);
    }
    return products;
  }

  findOne(id: number) {
    /**
     * TODO:  Return proper response if a given product does not exist
     * TODO:  Fetch product from database
     */
    return products.filter((product) => product.id === id);
  }

  findByIds(productIds: number[]) {
    const foundProducts = products.filter((product) =>
      productIds.includes(product.id),
    );
    if (foundProducts.length === 0) {
      throw new NotFoundException('No products match your criteria.');
    }
    return foundProducts;
  }

  totalCost(products, productIds): number {
    let totalSum = 0;
    const productCount = new Map<number, number>();
    for (const productId of productIds) {
      if (!productCount.has(productId)) {
        productCount.set(productId, 0);
      }
      productCount.set(productId, productCount.get(productId) + 1);
    }

    productCount.forEach((quantity, productId) => {
      const product = products.find((p) => p.id === productId);
      if (product) {
        totalSum += product.price * quantity;
      }
    });
    return totalSum;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = products.findIndex((product) => product.id === id);
    /**
     * If found product...
     */
    if (productIndex !== -1) {
      /**
       * Merge updated product by found index
       */
      const updatedProduct = { ...products[productIndex], ...updateProductDto };
      /**
       * Assign modification to the found index
       */
      products[productIndex] = updatedProduct;
      /**
       * Return updated result
       */
      return updatedProduct;
    } else {
      throw new NotFoundException('Product not found!');
    }
  }

  remove(id: number) {
    const productIndex = products.findIndex((product) => product.id === id);
    /**
     * If found product...
     */
    if (productIndex !== -1) {
      /**
       * Delete the product
       */
      const deletedProduct = products.splice(productIndex, 1)[0];
      /**
       * Return deleted result
       */
      return deletedProduct;
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  buildPizza(createPizzaDto: CreatePizzaDto) {
    const existingProduct = products.find(
      (product) => product.name === createPizzaDto.name,
    );

    if (existingProduct) {
      throw new BadRequestException(
        `Pizza with name ${createPizzaDto.name} already exists!`,
      );
    }
    const newPizzaId = products.length + 1;
    const newPizzaName = createPizzaDto.name;
    const newPizzaPrice = createPizzaDto.price;
    const newPizzaType = createPizzaDto?.type;
    const newPizzaBase = createPizzaDto.base;
    const newPizzaToppings = createPizzaDto.toppings;
    const newPizza = {
      id: newPizzaId,
      name: newPizzaName,
      price: newPizzaPrice,
      type: newPizzaType,
      base: newPizzaBase,
      toppings: newPizzaToppings,
    };
    products.push(newPizza);
    return createPizzaDto;
  }
}
