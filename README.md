# Pizza / Order API
### Description
This is my attempt to write a pizza / ordering API
A lot of the core features are missing due to familiarizing myself with NestJS
and overspending time reading it.

#### What does it cover so far?
- Crud operations for entities (Orders, Products, Customers)
- Calculation of Total Cost when Order has been placed
- In memory storing of data

#### What could have been added as potential features
- Database & ORM module
- JWT Implementation 
- Guards restriction
- Events for handling Order status
- Further more validation on DTOs and other validation
- Proper error handling 
- Logger per severity level
- Tests for all of the modules
- Usage of fastify for performance improvement
- Caching when necessary
- Swagger 
- ENV Variables

## Available REST Endpoints


| METHOD | URL | RETURN |
| ------ | ------ | ------ |
| GET | **products** | Fetch all products
| GET | **products/id** | Fetch one product
| POST | **products** | Add new product
| POST | **products/build** | Add new custom pizza
| PATCH | **products/:id** | Update a product
| DELETE | **products/:id** | Delete a product
| GET | **customers** | Fetch all customers
| GET | **customers/id** | Fetch one customer
| PATCH | **customers/:id** | Update a customer
| DELETE | **customers/:id** | Delete a customer
| GET | **orders** | Fetch all orders
| GET | **orders/id** | Fetch one order
| PATCH | **orders/:id** | Update an order
| DELETE | **orders/:id** | Delete an order
#### Resources 
- NestJS Documentation
- TypeScript Documentation

 
**RUN Commands** 
npm install
npm run start:dev
[**Tests**] => npm run test:watch
```sh
Server is running on 127.0.0.1:3000
```

## License
MIT
