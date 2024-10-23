import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigService available globally
    }),
  ],
  providers: [
    {
      provide: DynamoDBClient,
      useFactory: (configService: ConfigService) => {
        return new DynamoDBClient({
          region: configService.get<string>('AWS_REGION'),
          credentials: {
            accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
          },
        });
      },
      inject: [ConfigService], // Inject ConfigService to access environment variables
    },
  ],
  exports: [DynamoDBClient], // Export the client for use in other modules
})
export class DynamoDBModule {}
