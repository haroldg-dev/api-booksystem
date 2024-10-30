import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'; // To handle marshalling/unmarshalling of DynamoDB objects

@Injectable()
export class MassageServicesService {
  private tableName = 'SPA_services'; // Make sure the DynamoDB table exists

  constructor(private readonly dynamoDBClient: DynamoDBClient) {}

  // Create a new massage service
  async createMassageService(massageService: any): Promise<any> {
    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall({
        // id: massageService.id ?? null, // Partition Key
        name: massageService.firstName,
        description: massageService.description,
        price: massageService.price,
        duration: massageService.duration,
      }),
    });
    console.log('Service: ', massageService);
    try {
      await this.dynamoDBClient.send(command);
      return { message: 'Massage Service created successfully!' };
    } catch (error) {
      console.error('Error creating massage service', error);
      throw new Error('Could not create massage service in DynamoDB');
    }
  }

  //Retrieve all massage services
  async getAllMassageServices(): Promise<any[]> {
    const command = new ScanCommand({
      TableName: this.tableName,
    });

    try {
      const result = await this.dynamoDBClient.send(command);
      return result.Items ? result.Items.map((item) => unmarshall(item)) : [];
    } catch (error) {
      console.error('Error fetching all massage services', error);
      throw new Error('Could not fetch massage services from DynamoDB');
    }
  }

  // Retrieve a massage service by id
  async getMassageService(id: string): Promise<any> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: marshall({ massageService_id: id }), // Partition Key
    });

    try {
      const result = await this.dynamoDBClient.send(command);
      return result.Item ? unmarshall(result.Item) : null;
    } catch (error) {
      console.error('Error fetching massage person', error);
      throw new Error('Could not fetch massage service from DynamoDB');
    }
  }

  // Update a massage service
  async updateMassageService(
    id: string,
    updateData: Partial<any>,
  ): Promise<any> {
    const command = new UpdateItemCommand({
      TableName: this.tableName,
      Key: marshall({ id }), // Partition Key
      UpdateExpression:
        'set #name = :name, #description = :description, #price = :price, #duration = :duration',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#description': 'description',
        '#price': 'price',
        '#duration': 'duration',
      },
      ExpressionAttributeValues: marshall({
        ':name': updateData.name,
        ':description': updateData.description,
        ':price': updateData.price,
        ':duration': updateData.duration,
      }),
    });

    try {
      await this.dynamoDBClient.send(command);
      return { message: 'Massage service updated successfully!' };
    } catch (error) {
      console.error('Error updating massage service', error);
      throw new Error('Could not update massage service in DynamoDB');
    }
  }

  // Delete a massage service by id
  async deleteMassageService(id: string): Promise<any> {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: marshall({ id }), // Partition Key
    });

    try {
      await this.dynamoDBClient.send(command);
      return { message: 'Massage service deleted successfully!' };
    } catch (error) {
      console.error('Error deleting massage service', error);
      throw new Error('Could not delete massage service from DynamoDB');
    }
  }
}
