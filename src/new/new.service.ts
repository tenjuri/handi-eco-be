import { Injectable } from '@nestjs/common';
import { CreateNewDto } from './dto/create-new.dto';
import { UpdateNewDto } from './dto/update-new.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class NewService {
  constructor(private prisma: PrismaService) {}

  create(createNewDto: CreateNewDto) {
    return 'This action adds a new new';
  }

  async findAllNews() {
    return await this.prisma.blog.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findBySlug(slug: string) {
    return await this.prisma.blog.findUnique({
      where: { slug },
    });
  }

  findAll() {
    return `This action returns all new`;
  }

  findOne(id: number) {
    return `This action returns a #${id} new`;
  }

  update(id: number, updateNewDto: UpdateNewDto) {
    return `This action updates a #${id} new`;
  }

  remove(id: number) {
    return `This action removes a #${id} new`;
  }
}
