import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async onModuleInit() {
    await this.prisma.user.create({
      data: { name: 'John Doe', email: 'johndoe@me.com' },
    });
    const users = await this.prisma.user.findMany();
    console.log(users);
  }
  getHello(): string {
    return 'Hello World!';
  }
}
