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

@Injectable()
export class PaymentService {
  constructor(
    @Inject(DynamoDBClient)
    private readonly dynamoDbClient: DynamoDBClient,
  ) {}

  // Get all payments
  async getAllPayments() {
    const command = new ScanCommand({
      TableName: 'Payments',
    });
    const result = await this.dynamoDbClient.send(command);
    return result.Items.map((item) => unmarshall(item));
  }

  // Get a specific payment by ID
  async getPaymentById(id: string) {
    const command = new GetItemCommand({
      TableName: 'Payments',
      Key: marshall({ id }),
    });
    const result = await this.dynamoDbClient.send(command);
    return result.Item ? unmarshall(result.Item) : null;
  }

  // Create a new payment
  async createPayment(paymentData: {
    id: string;
    amount: number;
    date: string;
    status: string;
  }) {
    const command = new PutItemCommand({
      TableName: 'Payments',
      Item: marshall(paymentData),
    });
    await this.dynamoDbClient.send(command);
    return paymentData;
  }

  // Update an existing payment
  async updatePayment(
    id: string,
    updateData: { amount?: number; date?: string; status?: string },
  ) {
    const updateExpression = [];
    const expressionAttributeValues = {};

    if (updateData.amount) {
      updateExpression.push('amount = :amount');
      expressionAttributeValues[':amount'] = {
        N: updateData.amount.toString(),
      };
    }
    if (updateData.date) {
      updateExpression.push('date = :date');
      expressionAttributeValues[':date'] = { S: updateData.date };
    }
    if (updateData.status) {
      updateExpression.push('status = :status');
      expressionAttributeValues[':status'] = { S: updateData.status };
    }

    const command = new UpdateItemCommand({
      TableName: 'Payments',
      Key: marshall({ id }),
      UpdateExpression: `SET ${updateExpression.join(', ')}`,
      ExpressionAttributeValues: marshall(expressionAttributeValues),
      ReturnValues: 'ALL_NEW',
    });

    const result = await this.dynamoDbClient.send(command);
    return result.Attributes ? unmarshall(result.Attributes) : null;
  }

  // Delete a payment by ID
  async deletePayment(id: string) {
    const command = new DeleteItemCommand({
      TableName: 'Payments',
      Key: marshall({ id }),
    });
    await this.dynamoDbClient.send(command);
    return { id };
  }
}
