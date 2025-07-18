import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Product } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

export interface CreateProductBody extends Omit<Product, 'id' | 'createdAt'> {}
export interface UpdateProductBody extends Partial<Product> {}

@Injectable()
export class ProductService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async get(orderId: string) {
    const products = await this.prismaService.product.findMany({
      where: {
        orderId,
      },
    })

    return products
  }

  async create(orderId: string, body: CreateProductBody) {
    const product = await this.prismaService.product.create({
      data: {
        ...body,
        orderId,
      },
    })

    return product
  }

  async update(userId: string, body: UpdateProductBody) {
    const product = await this.prismaService.product.update({
      data: body,
      where: {
        id: body.id,
      },
    })

    return product
  }

  async delete(id: string) {
    const product = await this.prismaService.product.delete({
      where: {
        id,
      },
    })

    return product
  }
}
