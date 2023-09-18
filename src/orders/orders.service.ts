import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CustomersService } from 'src/customers/customers.service';
import { ProductsService } from 'src/products/products.service';
import { orders } from 'src/data/mock-data';
import { Order } from './entities/order.entity';
@Injectable()
export class OrdersService {
  constructor(
    private readonly customerService: CustomersService,
    private readonly productService: ProductsService,
  ) {}

  create(createOrderDto: CreateOrderDto) {
    const customer = this.customerService.findOne(createOrderDto.customerId);
    const products = this.productService.findByIds(createOrderDto.productIds);
    const totalCost = this.productService.totalCost(
      products,
      createOrderDto.productIds,
    );
    const newOrder = {
      orderId: orders.length + 1,
      customerDetails: customer,
      products: products,
      totalCost: totalCost,
    };
    orders.push(newOrder);
    return newOrder;
  }

  findAll(): Order[] {
    return orders;
  }

  findOne(id: number) {
    /**
     * TODO:  Return proper response if a given product does not exist
     * TODO:  Fetch order from database
     */

    return orders.filter((order) => order.orderId === id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    const customerIndex = orders.findIndex((order) => order.id === id);
    /**
     * If found customer...
     */
    if (customerIndex !== -1) {
      /**
       * Merge updated customer by found index
       */
      const updatedCustomer = {
        ...orders[customerIndex],
        ...updateOrderDto,
      };
      /**
       * Assign modification to the found index
       */
      orders[customerIndex] = updatedCustomer;
      /**
       * Return updated result
       */
      return updatedCustomer;
    } else {
      throw new NotFoundException('Customer not found!');
    }
  }

  remove(id: number) {
    const orderIndex = orders.findIndex((order) => order.orderId === id);
    /**
     * If found order...
     */
    if (orderIndex !== -1) {
      /**
       * Delete the order
       */
      const deletedProduct = orders.splice(orderIndex, 1)[0];
      /**
       * Return deleted result
       */
      return deletedProduct;
    } else {
      throw new NotFoundException('Order not found');
    }
  }
}
