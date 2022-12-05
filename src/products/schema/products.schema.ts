import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type productsDocument = Products & Document;

@Schema()
export class Products {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  categories: string;

  @Prop()
  size: string;

  @Prop()
  color: string;

  @Prop()
  QuantityPurchase: number;

  @Prop()
  price: number;

  @Prop()
  image: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
