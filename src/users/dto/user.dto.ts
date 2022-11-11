import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUseDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
