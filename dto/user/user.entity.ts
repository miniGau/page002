import { CosmosPartitionKey } from '@nestjs/azure-database';

@CosmosPartitionKey('id')
export class User {
  id: string;
  userId: number;
  email: string;
  name: string;
  picture: string;
  username: string;
}
