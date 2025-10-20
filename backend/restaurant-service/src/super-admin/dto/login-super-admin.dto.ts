import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class LoginSuperAdminDto {
  @ValidateIf((dto) => !dto.email)
  @IsNotEmpty()
  @IsString()
  username?: string;

  @ValidateIf((dto) => !dto.username)
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
