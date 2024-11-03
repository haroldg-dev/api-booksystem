import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({
    description: 'The unique identifier of the payment',
    example: '12345',
    required: false,
  })
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({
    description: 'The status of the payment',
    example: 'Paid',
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'The date of the payment',
    example: '2024-01-01',
  })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    description: 'The amount of the payment',
    example: 100.0,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
