import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Order, Product } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

export interface CreateOrderBody
  extends Omit<Order, 'id' | 'createdAt' | 'user' | 'userId'> {}
export interface CreateProductBody extends Omit<Product, 'id' | 'createdAt'> {}
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
      include: {
        _count: {
          select: { Product: true },
        },
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

  async addProducts(orderId: string, body: CreateProductBody[]) {
    const products = await this.prismaService.product.createMany({
      data: body.map((product) => ({
        ...product,
        orderId,
      })),
    })

    return products
  }

  async deleteProduct(productId: string) {
    const products = await this.prismaService.product.delete({
      where: {
        id: productId,
      },
    })

    return products
  }
}
