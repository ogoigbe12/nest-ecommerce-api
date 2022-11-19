import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FilterProductDto } from 'src/products/dto/filter-product.dto';
import { ProductsDto } from 'src/products/dto/products.dto';
import { ProductsService } from 'src/products/service/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() productData: ProductsDto) {
    const newProduct = await this.productService.createproduct(productData);
    if (newProduct) return { msg: 'Product Created' };
    return new HttpException('product already exit', HttpStatus.BAD_REQUEST);
  }
  @Get()
  async getAllProducts(@Query() filterProductsDTO: FilterProductDto) {
    if (Object.keys(filterProductsDTO).length) {
      const filteredProducts = await this.productService.getFilterProduct(
        filterProductsDTO,
      );
      return filteredProducts;
    } else {
      const allProducts = await this.productService.getProducts();
      return allProducts;
    }
  }
  @Get(':id')
  async getProductById(@Param('id') id: number) {
    const getOne = await this.productService.getProductById(id);
    if (!getOne)
      throw new HttpException('Product does not exit', HttpStatus.NOT_FOUND);
    return getOne;
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.DeleteProduct(id);
  }
}
