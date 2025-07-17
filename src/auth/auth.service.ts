
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

export interface LoginBody {
  email: string
  password: string
}

export interface RegisterBody {
  email: string
  password: string
  birthDate: string
  gender: string
  name: string
  phoneNumber: string
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) {}

  async signIn({ email, password }: LoginBody,
  ): Promise<{ access_token: string }> {
    const user = await this.prismaService.extendedPrismaClient().user.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      throw new UnauthorizedException('User not exist');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Incorrect password');
    }

    const { birthDate, createdAt, gender, id, name, phoneNumber } = user

    const payload = {
      sub: user.id,
      email,
      birthDate,
      createdAt,
      gender,
      id,
      name,
      phoneNumber
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(body: RegisterBody): Promise<{ access_token: string }> {
    const user = await this.prismaService.extendedPrismaClient().user.create(
      {
        data: body
      }
    )

    const { birthDate, createdAt, gender, id, name, email, phoneNumber } = user

    const payload = {
      sub: user.id,
      email,
      birthDate,
      createdAt,
      gender,
      id,
      name,
      phoneNumber
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
