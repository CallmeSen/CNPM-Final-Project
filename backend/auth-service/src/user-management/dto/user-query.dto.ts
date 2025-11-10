import { IsIn, IsOptional, IsString } from 'class-validator';
import { ManagedUserType } from './create-user.dto';

export class UserQueryDto {
  @IsOptional()
  @IsIn(['customer', 'admin', 'restaurant', 'delivery'])
  userType?: ManagedUserType;

  @IsOptional()
  @IsString()
  search?: string;
}
