import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: any;

  @IsEmail()
  @IsNotEmpty()
  email: any;

  @IsString()
  @IsOptional()
  phone: any;

  @IsString()
  @IsNotEmpty()
  password: any;
}
