import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The first name of the person' })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The last name of the person' })
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: 'The email of the person' })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The phone number of the person' })
  phone: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ description: 'The password for the person account' })
  password: string;
}
