declare module '@prisma/client' {
  import { PrismaClient as BasePrismaClient } from '@prisma/client/runtime';
  
  export class PrismaClient extends BasePrismaClient {
    constructor(options?: any);
    $disconnect(): Promise<void>;
    $connect(): Promise<void>;
  }
} 