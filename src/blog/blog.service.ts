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
  async findAll() {
    const allBlogs = await this.prisma.blog.findMany();
    return allBlogs.map((blog) => ({
      slug: blog.slug,
    }));
  }

  async findOne(id: string) {
    return this.prisma.blog.findUnique({
      where: {
        id,
      },
    });
  }

  async update(slug: string, updateBlogDto: UpdateBlogDto) {
    const exist = await this.prisma.blog.findFirst({
      where: {
        slug,
      },
    });
    if (!exist) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }
    return this.prisma.blog.update({
      where: {
        slug,
      },
      data: updateBlogDto,
    });
  }

  async publish(slug: string) {
    const exist = await this.prisma.blog.findFirst({
      where: {
        slug,
      },
    });
    if (!exist) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }
    const isPublished = exist.isPublished;
    return this.prisma.blog.update({
      where: {
        slug,
      },
      data: {
        isPublished: !isPublished,
      },
    });
  }

  async findAllBlogs() {
    return await this.prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async remove(id: string) {
    return this.prisma.blog.delete({
      where: {
        id,
      },
    });
  }
}
