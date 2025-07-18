import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { PrismaService } from './prisma.service'
import { AuthModule } from './auth/auth.module'
import { OrderModule } from './order/order.module'
import { ProductsModule } from './products/products.module'

@Module({
  imports: [AuthModule, OrderModule, ProductsModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
