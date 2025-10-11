import {
  IsBooleanString,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class CalculateFeeDto {
  @IsNumberString()
  @IsNotEmpty()
  distance!: string;

  @IsOptional()
  @IsIn(['bike', 'scooter', 'car', 'bicycle', 'all'])
  vehicleType?: string;

  @IsOptional()
  @IsBooleanString()
  isRushHour?: string;
}
