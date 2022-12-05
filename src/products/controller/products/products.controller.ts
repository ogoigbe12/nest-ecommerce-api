import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadNew(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ) {
    // console.log(file);

    const newUpload = await this.productService.uploadToCloudinary(file, id);
    return newUpload;
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
  @Put('/update/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() productDto: ProductsDto,
  ) {
    const updateProductNew = await this.productService.updateProduct(
      id,
      productDto,
    );
    if (!updateProductNew)
      throw new HttpException('product does not exit', HttpStatus.BAD_REQUEST);
    return updateProductNew;
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.DeleteProduct(id);
  }
}
