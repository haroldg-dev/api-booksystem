import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({
    description: 'Unique identifier for the booking',
    example: '12345',
    required: false, // Optional field
  })
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({
    description: 'Name of the customer making the booking',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({
    description: 'Date of the booking in YYYY-MM-DD format',
    example: '2024-11-05',
  })
  @IsString()
  @IsNotEmpty()
  bookingDate: string;

  @ApiProperty({
    description: 'Status of the booking (e.g., confirmed, pending, canceled)',
    example: 'confirmed',
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
