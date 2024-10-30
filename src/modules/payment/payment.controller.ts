import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Get all payments
  @Get()
  async getAllPayments() {
    return await this.paymentService.getAllPayments();
  }

  // Get a specific payment by ID
  @Get(':id')
  async getPaymentById(@Param('id') id: string) {
    return await this.paymentService.getPaymentById(id);
  }

  // Create a new payment
  @Post()
  async createPayment(@Body() paymentData: { id: string; amount: number; date: string; status: string }) {
    return await this.paymentService.createPayment(paymentData);
  }

  // Update a specific payment
  @Put(':id')
  async updatePayment(@Param('id') id: string, @Body() updateData: { amount?: number; date?: string; status?: string }) {
    return await this.paymentService.updatePayment(id, updateData);
  }

  // Delete a specific payment
  @Delete(':id')
  async deletePayment(@Param('id') id: string) {
    return await this.paymentService.deletePayment(id);
  }
}
