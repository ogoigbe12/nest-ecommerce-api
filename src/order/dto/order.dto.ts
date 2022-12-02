import { Contains, IsNotEmpty } from 'class-validator';

export class ordersDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  @Contains('+')
  contantNumber: number;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  numberofItems: number;

  @IsNotEmpty()
  modeOfPayment: string;
}
