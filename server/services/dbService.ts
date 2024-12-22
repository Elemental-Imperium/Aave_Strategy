import { PrismaClient } from '@prisma/client';
import { env } from '../config/env';

class DatabaseService {
  private static instance: DatabaseService;
  private prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient({
      log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
      errorFormat: 'pretty',
    });
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public getPrisma(): PrismaClient {
    return this.prisma;
  }

  public async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
    } catch (error) {
      console.error('Error disconnecting from database:', error);
      throw error;
    }
  }
}

export const db = DatabaseService.getInstance().getPrisma();