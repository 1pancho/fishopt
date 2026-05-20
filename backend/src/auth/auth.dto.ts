import { IsEmail, IsString, MinLength, IsOptional, IsArray } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  region: string;

  @IsString()
  @IsOptional()
  inn?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsArray()
  @IsOptional()
  activityTypes?: string[];

  @IsArray()
  @IsOptional()
  categories?: string[];

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
