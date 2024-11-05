import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Payments') // Tags the controller for grouping in Swagger
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Get all payments
  @Get()
  @ApiOperation({ summary: 'Retrieve all payments' })
  @ApiResponse({
    status: 200,
    description: 'All payments retrieved successfully.',
  })
  async getAllPayments() {
    return await this.paymentService.getAllPayments();
  }

  // Get a specific payment by ID
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a payment by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the payment to retrieve' })
  @ApiResponse({ status: 200, description: 'Payment retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  async getPaymentById(@Param('id') id: string) {
    return await this.paymentService.getPaymentById(id);
  }

  // Create a new payment
  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiBody({ type: CreatePaymentDto, description: 'Data for the new payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  async createPayment(
    @Body(ValidationPipe)
    paymentData: CreatePaymentDto,
  ) {
    return await this.paymentService.createPayment(paymentData);
  }

  // Update a specific payment
  @Put(':id')
  @ApiOperation({ summary: 'Update an existing payment' })
  @ApiParam({ name: 'id', description: 'The ID of the payment to update' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        amount: { type: 'number', example: 100.0 },
        date: { type: 'string', format: 'date', example: '2024-01-01' },
        status: { type: 'string', example: 'Paid' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Payment updated successfully.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  async updatePayment(
    @Param('id') id: string,
    @Body() updateData: { amount?: number; date?: string; status?: string },
  ) {
    return await this.paymentService.updatePayment(id, updateData);
  }

  // Delete a specific payment
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the payment to delete' })
  @ApiResponse({ status: 200, description: 'Payment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  async deletePayment(@Param('id') id: string) {
    return await this.paymentService.deletePayment(id);
  }
}
