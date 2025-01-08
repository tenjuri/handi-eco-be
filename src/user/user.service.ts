import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const { password, ...result } = user;
    console.log(result);

    return result;
  }

  async create(data: {
    name: string;
    userName: string;
    password: string;
    isAdmin: boolean;
    isRootAdmin: boolean;
  }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { userName: data.userName },
    });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const passwordHash = await this.hashPassword(data.password);
    return this.prisma.user.create({
      data: { ...data, password: passwordHash },
    });
  }

  async update(id: number, data: { userName: string; password: string }) {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const passwordHash = await this.hashPassword(data.password);
    return this.prisma.user.update({
      where: { id },
      data: { ...data, password: passwordHash },
    });
  }

  async remove(id: number) {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });

    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.user.delete({ where: { id } });
  }
}
