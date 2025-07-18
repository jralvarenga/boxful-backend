import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Order } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

export interface CreateOrderBody
  extends Omit<Order, 'id' | 'createdAt' | 'user' | 'userId'> {}
export interface UpdateOrderBody extends Partial<Order> {}

@Injectable()
export class OrderService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async get(userId: string) {
    const orders = await this.prismaService.order.findMany({
      where: {
        userId,
      },
    })

    return orders
  }

  async getOne(id: string) {
    const order = await this.prismaService.order.findUnique({
      include: {
        Product: {
          select: {
            content: true,
            height: true,
            length: true,
            weight: true,
            width: true,
          },
        },
      },
      where: {
        id,
      },
    })

    return order
  }

  async create(userId: string, body: CreateOrderBody) {
    const order = await this.prismaService.order.create({
      data: {
        ...body,
        userId,
      },
    })

    return order
  }

  async update(userId: string, body: UpdateOrderBody) {
    const order = await this.prismaService.order.update({
      data: body,
      where: {
        id: body.id,
      },
    })

    return order
  }

  async delete(id: string) {
    const order = await this.prismaService.order.delete({
      where: {
        id,
      },
    })

    return order
  }
}
