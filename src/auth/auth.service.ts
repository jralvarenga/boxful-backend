import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { User } from '../db/prisma'
import { JwtService } from '@nestjs/jwt'

export interface LoginBody extends Pick<User, 'email' | 'password'> {}
export interface RegisterBody extends Omit<User, 'id' | 'createdAt'> {}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async signIn({
    email,
    password,
  }: LoginBody): Promise<{ access_token: string }> {
    const user = await this.prismaService
      .extendedPrismaClient()
      .user.findUnique({
        where: {
          email,
        },
      })

    if (!user) {
      throw new UnauthorizedException('User not exist')
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Incorrect password')
    }

    const {
      birthDate,
      createdAt,
      gender,
      id,
      firstName,
      lastName,
      phoneNumber,
    } = user

    const payload = {
      sub: user.id,
      email,
      birthDate,
      createdAt,
      gender,
      id,
      firstName,
      lastName,
      phoneNumber,
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async register(body: RegisterBody): Promise<{ access_token: string }> {
    const user = await this.prismaService.extendedPrismaClient().user.create({
      data: body,
    })

    const {
      birthDate,
      createdAt,
      gender,
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
    } = user

    const payload = {
      sub: user.id,
      email,
      birthDate,
      createdAt,
      gender,
      id,
      firstName,
      lastName,
      phoneNumber,
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }
}
