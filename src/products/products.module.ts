import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceService } from 'src/cloudinary/service/service.service';
import { ProductsController } from './controller/products/products.controller';
import { Products, ProductsSchema } from './schema/products.schema';
import { ProductsService } from './service/products/products.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Products.name,
        schema: ProductsSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ServiceService],
})
export class ProductsModule {}
