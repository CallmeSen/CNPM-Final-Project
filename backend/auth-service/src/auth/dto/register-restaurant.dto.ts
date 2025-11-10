import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  contactNumber: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
