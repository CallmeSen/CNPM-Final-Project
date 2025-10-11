import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFeeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  baseDistance!: number;

  @IsNumber()
  baseFee!: number;

  @IsNumber()
  perKmFee!: number;

  @IsIn(['bike', 'scooter', 'car', 'bicycle', 'all'])
  vehicleType!: string;

  @IsNumber()
  rushHourMultiplier!: number;

  @IsBoolean()
  isActive!: boolean;

  @IsOptional()
  @IsDateString()
  effectiveFrom?: Date;

  @IsOptional()
  @IsDateString()
  effectiveTo?: Date | null;
}
