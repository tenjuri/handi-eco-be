import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { PrismaService } from '../prisma/prisma.service';
import slugify from 'slugify';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  generateSlug = (title: string) => {
    return slugify(title, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: true, // strip special characters except replacement, defaults to `false`
      trim: true,
    });
  };

  async create(createBlogDto: CreateBlogDto) {
    const slug = this.generateSlug(createBlogDto.title);
    const exist = await this.prisma.blog.findFirst({
      where: {
        slug,
      },
    });
    if (exist) {
      throw new HttpException('Title already exists', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.blog.create({
      data: {
        ...createBlogDto,
        slug,
      },
    });
  }

  async findBlogBySlug(slug: string) {
    return this.prisma.blog.findFirst({
      where: {
        slug,
      },
    });
  }
  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
