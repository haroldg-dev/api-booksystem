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
  async createBooking(bookingData: CreateBookingDto) {
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
}
