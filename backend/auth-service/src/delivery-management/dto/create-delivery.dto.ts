import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { VehicleType } from '../../schemas/delivery-personnel.schema';

export class CreateDeliveryDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsIn(['bike', 'scooter', 'car', 'bicycle'])
  vehicleType!: VehicleType;

  @IsString()
  @IsNotEmpty()
  licenseNumber!: string;
}
