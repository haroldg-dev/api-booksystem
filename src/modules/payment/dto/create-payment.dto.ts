import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
