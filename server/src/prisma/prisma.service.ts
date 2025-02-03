import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    console.log('🟢 Connecting to the database...'); // Debug log
    try {
      await this.$connect();
      console.log('🟢 Successfully connected to the database!'); // Debug log
    } catch (error) {
      console.error('❌ Database connection failed:', error); // Debugging error
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
