import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './prisma.service'
import { AuthModule } from './auth/auth.module'
import { OrderModule } from './order/order.module'

@Module({
  imports: [AuthModule, OrderModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
