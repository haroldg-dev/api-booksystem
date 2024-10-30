import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'; // To handle marshalling/unmarshalling of DynamoDB objects
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PersonService {
  private tableName = 'SPA_Person'; // Make sure the DynamoDB table exists

  constructor(private readonly dynamoDBClient: DynamoDBClient) {}

  // Create a new person
  async createPerson(person: any): Promise<any> {
    const item = marshall({
      person_id: uuidv4(),
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      phone: person.phone,
      password: person.password,
    });

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: item,
    });

    try {
      await this.dynamoDBClient.send(command);
      return { message: 'Person created successfully!' };
    } catch (error) {
      console.error('Error creating person', error);
      throw new Error('Could not create person in DynamoDB');
    }
  }

  // Retrieve a person by id
  async getPerson(id: string): Promise<any> {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: marshall({ person_id: id }), // Partition Key
    });

    try {
      const result = await this.dynamoDBClient.send(command);
      return result.Item ? unmarshall(result.Item) : null;
    } catch (error) {
      console.error('Error fetching person', error);
      throw new Error('Could not fetch person from DynamoDB');
    }
  }

  // Update a person
  async updatePerson(id: string, updateData: Partial<any>): Promise<any> {
    const command = new UpdateItemCommand({
      TableName: this.tableName,
      Key: marshall({ id }), // Partition Key
      UpdateExpression:
        'set #firstName = :firstName, #lastName = :lastName, #email = :email, #phone = :phone',
      ExpressionAttributeNames: {
        '#firstName': 'firstName',
        '#lastName': 'lastName',
        '#email': 'email',
        '#phone': 'phone',
      },
      ExpressionAttributeValues: marshall({
        ':firstName': updateData.firstName,
        ':lastName': updateData.lastName,
        ':email': updateData.email,
        ':phone': updateData.phone,
      }),
    });

    try {
      await this.dynamoDBClient.send(command);
      return { message: 'Person updated successfully!' };
    } catch (error) {
      console.error('Error updating person', error);
      throw new Error('Could not update person in DynamoDB');
    }
  }

  // Delete a person by id
  async deletePerson(id: string): Promise<any> {
    const command = new DeleteItemCommand({
      TableName: this.tableName,
      Key: marshall({ id }), // Partition Key
    });

    try {
      await this.dynamoDBClient.send(command);
      return { message: 'Person deleted successfully!' };
    } catch (error) {
      console.error('Error deleting person', error);
      throw new Error('Could not delete person from DynamoDB');
    }
  }
}
