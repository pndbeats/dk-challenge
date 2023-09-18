import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { customers } from 'src/data/mock-data';

@Injectable()
export class CustomersService {
  create(createCustomerDto: CreateCustomerDto) {
    /**
     * TODO: Use validation on DTO
     */

    /** Find if the customer already exists */
    const existingCustomer = customers.find(
      (product) => product.name === CreateCustomerDto.name,
    );

    if (existingCustomer) {
      throw new BadRequestException(
        `Product with name ${CreateCustomerDto.name} already exists!`,
      );
    }
    /**
     * Build new customer DTO
     */

    const newCustomerId = customers.length + 1;
    const newCustomerName = createCustomerDto.name;
    const newCustomer = {
      id: newCustomerId,
      name: newCustomerName,
    };
    customers.push(newCustomer);
    return newCustomer;
  }

  findAll() {
    return customers;
  }

  findOne(id: number) {
    return customers.filter((customer) => customer.id === id);
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customerIndex = customers.findIndex((customer) => customer.id === id);
    /**
     * If found customer...
     */
    if (customerIndex !== -1) {
      /**
       * Merge updated customer by found index
       */
      const updatedCustomer = {
        ...customers[customerIndex],
        ...updateCustomerDto,
      };
      /**
       * Assign modification to the found index
       */
      customers[customerIndex] = updatedCustomer;
      /**
       * Return updated result
       */
      return updatedCustomer;
    } else {
      throw new NotFoundException('Customer not found!');
    }
  }

  remove(id: number) {
    const customerIndex = customers.findIndex((customer) => customer.id === id);
    /**
     * If found customer...
     */
    if (customerIndex !== -1) {
      /**
       * Delete the customer
       */
      const deletedProduct = customers.splice(customerIndex, 1)[0];
      /**
       * Return deleted result
       */
      return deletedProduct;
    } else {
      throw new NotFoundException('Customer not found');
    }
  }
}
