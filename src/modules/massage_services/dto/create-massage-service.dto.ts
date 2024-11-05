import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMassageServiceDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Unique identifier for the massage service',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the massage service',
    example: 'Deep Tissue Massage',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description of the massage service',
    example: 'A therapeutic massage to relieve deep muscle tension',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Duration of the massage service',
    example: '60 minutes',
  })
  duration: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Price of the massage service', example: 120.0 })
  price: number;
}
