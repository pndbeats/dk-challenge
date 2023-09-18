import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreatePizzaDto } from './dto/create-pizza.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
  ): CreateProductDto {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query('type') type: 'food' | 'drinks'): CreateProductDto[] {
    return this.productsService.findAll(type);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): CreateProductDto {
    return this.productsService.findOne(id)[0];
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): UpdateProductDto {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Post('build')
  buildCustomPizza(
    @Body(new ValidationPipe()) createPizzaDto: CreatePizzaDto,
  ): CreatePizzaDto {
    return this.productsService.buildPizza(createPizzaDto);
  }
}
