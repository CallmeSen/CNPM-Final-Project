import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRestaurantDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
