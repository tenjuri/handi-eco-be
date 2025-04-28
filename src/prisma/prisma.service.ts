import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['error', 'warn'],
      datasources: {
        db: {
          url: process.env.MONGO_URI,
        },
      },
    });
  }

  async onModuleInit() {
    let retries = 5;
    while (retries) {
      try {
        await this.$connect();
        break;
      } catch (error) {
        if (retries === 1) throw error;
        retries -= 1;
        console.log(`Retrying Prisma connection... ${retries} attempts left`);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // retry after 1 second
      }
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
