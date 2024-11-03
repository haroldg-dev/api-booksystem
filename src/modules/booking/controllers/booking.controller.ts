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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { BookingService } from '../services/booking.service';
import { CreateBookingDto } from '../dto/create-booking.dto';

@ApiTags('booking') // Adds a tag to group all Booking endpoints
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({ status: 200, description: 'Returns a list of all bookings.' })
  async getAllBookings() {
    return await this.bookingService.getAllBookings();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the booking to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'Returns the booking with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  async getBookingById(@Param('id') id: string) {
    return await this.bookingService.getBookingById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBody({ type: CreateBookingDto })
  @ApiResponse({
    status: 201,
    description: 'The booking has been created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid booking data.' })
  async createBooking(@Body(ValidationPipe) bookingData: CreateBookingDto) {
    return await this.bookingService.createBooking(bookingData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a booking' })
  @ApiParam({ name: 'id', description: 'The ID of the booking to update' })
  @ApiBody({
    description: 'The new data for the booking',
    type: CreateBookingDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The booking has been updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  async updateBooking(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateBookingDto>,
  ) {
    return await this.bookingService.updateBooking(id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the booking to delete' })
  @ApiResponse({
    status: 200,
    description: 'The booking has been deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  async deleteBooking(@Param('id') id: string) {
    return await this.bookingService.deleteBooking(id);
  }
}
