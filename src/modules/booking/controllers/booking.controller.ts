import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BookingService } from '../services/booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async getAllBookings() {
    return await this.bookingService.getAllBookings();
  }

  @Get(':id')
  async getBookingById(@Param('id') id: string) {
    return await this.bookingService.getBookingById(id);
  }

  @Post()
  async createBooking(@Body() bookingData) {
    return await this.bookingService.createBooking(bookingData);
  }

  @Put(':id')
  async updateBooking(@Param('id') id: string, @Body() updateData) {
    return await this.bookingService.updateBooking(id, updateData);
  }

  @Delete(':id')
  async deleteBooking(@Param('id') id: string) {
    return await this.bookingService.deleteBooking(id);
  }
}
