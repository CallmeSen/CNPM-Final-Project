import { IsNumberString, IsOptional } from 'class-validator';

export class NearbyQueryDto {
  @IsNumberString()
  longitude!: string;

  @IsNumberString()
  latitude!: string;

  @IsOptional()
  @IsNumberString()
  maxDistance?: string;
}
