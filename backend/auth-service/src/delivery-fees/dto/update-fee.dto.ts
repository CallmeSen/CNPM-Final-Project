import {
  IsBoolean,
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateFeeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  baseDistance?: number;

  @IsOptional()
  @IsNumber()
  baseFee?: number;

  @IsOptional()
  @IsNumber()
  perKmFee?: number;

  @IsOptional()
  @IsIn(['bike', 'scooter', 'car', 'bicycle', 'all'])
  vehicleType?: string;

  @IsOptional()
  @IsNumber()
  rushHourMultiplier?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  effectiveFrom?: Date;

  @IsOptional()
  @IsDateString()
  effectiveTo?: Date | null;
}
