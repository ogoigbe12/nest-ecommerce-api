import { IsNotEmpty } from 'class-validator';

export class ProductsDto {
  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  categories: string;

  size: string;

  @IsNotEmpty()
  QuantityPurchase: number;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  price: number;
}
