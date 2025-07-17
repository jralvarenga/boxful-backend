import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from './db/prisma';
import { withAccelerate } from '@prisma/extension-accelerate';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Note: this is optional
    await this.$connect();
  }

  extendedPrismaClient() {
    return this.$extends(withAccelerate());
  }
}
