import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common'
import {
  CreateOrderBody,
  CreateProductBody,
  OrderService,
  UpdateOrderBody,
} from './order.service'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @HttpCode(HttpStatus.OK)
  @Get('')
  @UseGuards(AuthGuard)
  get(@Request() req) {
    const user = req.user
    return this.orderService.get(user.sub)
  }

  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  @UseGuards(AuthGuard)
  getOne(@Param('id') id: string) {
    return this.orderService.getOne(id)
  }

  @HttpCode(HttpStatus.OK)
  @Post('')
  @UseGuards(AuthGuard)
  create(@Request() req, @Body() body: CreateOrderBody) {
    const user = req.user
    return this.orderService.create(user.sub, body)
  }

  @HttpCode(HttpStatus.OK)
  @Put('')
  @UseGuards(AuthGuard)
  update(@Request() req, @Body() body: UpdateOrderBody) {
    const user = req.user
    return this.orderService.update(user.sub, body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Request() req, @Param('id') id: string) {
    const user = req.user
    return this.orderService.delete(id)
  }

  @HttpCode(HttpStatus.OK)
  @Post('/:id/products')
  @UseGuards(AuthGuard)
  addProducts(@Body() body: CreateProductBody[], @Param('id') id: string) {
    return this.orderService.addProducts(id, body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/products/:productId')
  @UseGuards(AuthGuard)
  removeProducts(@Param('orderId') orderId: string) {
    return this.orderService.deleteProduct(orderId)
  }
}
