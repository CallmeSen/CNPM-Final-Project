import { IsIn, IsOptional, IsString } from 'class-validator';

export class DeliveryQueryDto {
  @IsOptional()
  @IsIn(['available', 'busy'])
  status?: 'available' | 'busy';

  @IsOptional()
  @IsString()
  vehicleType?: string;
}
