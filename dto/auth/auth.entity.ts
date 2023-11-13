import { CosmosPartitionKey } from '@nestjs/azure-database';

@CosmosPartitionKey('userId')
export class AuthEntity {
  id: string;
  userId: number;
  authType: number;
  token: string;
  created: number;
  expired: number;
}
