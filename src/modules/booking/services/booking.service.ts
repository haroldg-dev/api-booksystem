import { Injectable, Inject } from '@nestjs/common';
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  ScanCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { v4 as uuidv4 } from 'uuid';
import * as nodemailer from 'nodemailer';

@Injectable()
export class BookingService {
  constructor(
    @Inject(DynamoDBClient)
    private readonly dynamoDbClient: DynamoDBClient,
  ) {}

  // Get all bookings
  async getAllBookings() {
    const command = new ScanCommand({
      TableName: 'Bookings', // Update to use the 'Bookings' table
    });
    const result = await this.dynamoDbClient.send(command);
    return result.Items.map((item) => unmarshall(item));
  }

  // Get a specific booking by ID
  async getBookingById(id: string) {
    const command = new GetItemCommand({
      TableName: 'Bookings',
      Key: marshall({ id }),
    });
    const result = await this.dynamoDbClient.send(command);
    return result.Item ? unmarshall(result.Item) : null;
  }

  // Create a new booking
  async createBooking(bookingData: any) {
    const command = new PutItemCommand({
      TableName: 'Bookings',
      Item: marshall({
        id: uuidv4(),
        customerName: bookingData.customerName,
        bookingDate: bookingData.bookingDate,
        status: bookingData.status,
      }),
    });
    await this.dynamoDbClient.send(command);
    await this.sendConfirmationEmail(bookingData);
    return bookingData;
  }

  // Update an existing booking
  async updateBooking(
    id: string,
    updateData: {
      customerName?: string;
      bookingDate?: string;
      status?: string;
    },
  ) {
    const updateExpression = [];
    const expressionAttributeValues = {};

    if (updateData.customerName) {
      updateExpression.push('customerName = :customerName');
      expressionAttributeValues[':customerName'] = {
        S: updateData.customerName,
      };
    }
    if (updateData.bookingDate) {
      updateExpression.push('bookingDate = :bookingDate');
      expressionAttributeValues[':bookingDate'] = { S: updateData.bookingDate };
    }
    if (updateData.status) {
      updateExpression.push('status = :status');
      expressionAttributeValues[':status'] = { S: updateData.status };
    }

    const command = new UpdateItemCommand({
      TableName: 'Bookings',
      Key: marshall({ id }),
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeValues: marshall(expressionAttributeValues),
      ReturnValues: 'ALL_NEW',
    });

    const result = await this.dynamoDbClient.send(command);
    return result.Attributes ? unmarshall(result.Attributes) : null;
  }

  // Delete a booking by ID
  async deleteBooking(id: string) {
    const command = new DeleteItemCommand({
      TableName: 'Bookings',
      Key: marshall({ id }),
    });
    await this.dynamoDbClient.send(command);
    return { id };
  }

  async sendConfirmationEmail(bookingData: any) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tabitasrules@gmail.com',
        pass: 'fmvnsjztlntzgpsf',
      },
    });

    const mailOptions = {
      from: 'tabitasrules@gmail.com',
      name: 'System Booking',
      to: bookingData.customerEmail,
      subject: 'Booking Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Booking Confirmation</h1>
          <p style="font-size: 16px;">Dear ${bookingData.customerName},</p>
          <p style="font-size: 16px;">Your booking has been confirmed! Here are your booking details:</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h2 style="color: #2c5282; margin-bottom: 15px;">Appointment Details</h2>
            <p><strong>Date:</strong> ${bookingData.bookingDate}</p>
            <p><strong>Service:</strong> ${bookingData.service}</p>
            <p><strong>Description:</strong> ${bookingData.serviceDescription}</p>
          </div>

          <p style="font-size: 16px;">We look forward to seeing you!</p>
          <p style="font-size: 14px; color: #666;">Best regards,<br>Your Spa Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  }
}
