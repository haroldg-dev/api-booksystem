import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  bookingDate: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
