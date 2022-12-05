import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServiceService } from 'src/cloudinary/service/service.service';
import { FilterProductDto } from 'src/products/dto/filter-product.dto';
import { ProductsDto } from 'src/products/dto/products.dto';
import {
  Products,
  productsDocument,
} from 'src/products/schema/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productModel: Model<productsDocument>,
    private cloudinary: ServiceService,
  ) {}
  async createproduct(productDetailes: ProductsDto) {
    const findProduct = await this.productModel.findOne({
      title: productDetailes.title,
    });
    if (!findProduct) {
      const productToSave = new this.productModel(productDetailes);
      return productToSave.save();
    }
  }

  async getFilterProduct(
    filterProductDTO: FilterProductDto,
  ): Promise<Products[]> {
    const { categories, search } = filterProductDTO;
    let products = await this.getProducts();

    if (search) {
      products = products.filter(
        (product) =>
          product.title.includes(search) ||
          product.description.includes(search),
      );
    }
    if (categories) {
      products = products.filter(
        (product) => product.categories === categories,
      );
    }

    return products;
  }

  async getProducts() {
    return await this.productModel.find({});
  }
  async getProductById(id: number): Promise<Products> {
    return await this.productModel.findOne({ _id: id });
  }
  async DeleteProduct(id: number) {
    const deleteProduct = await this.productModel.findById({ _id: id });
    if (!deleteProduct)
      return new HttpException(
        'Product with id have being trash',
        HttpStatus.NOT_FOUND,
      );
    return this.productModel.deleteOne({ _id: id });
  }
  async updateProduct(id: number, productDto: ProductsDto) {
    const updateProductCart = await this.productModel.updateOne(
      {
        id: id,
      },
      productDto,
    );
    return updateProductCart;
  }
  async uploadToCloudinary(file: Express.Multer.File, id: number) {
    const product = await this.productModel.findOne({ _id: id });
    console.log(product);
    console.log(file);
    if (!product) {
      const image = await this.cloudinary.uploadFile(file).catch(() => {
        // console.log(e);
        throw new BadRequestException('Invalid file type.');
      });
      console.log(image);
      const updateProductCart = await this.productModel.updateOne(
        {
          id: product.id,
        },
        image.url,
      );
      return updateProductCart;
    }
  }
}
