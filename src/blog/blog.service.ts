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

  async findOne(id: number) {
    return this.prisma.blog.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.prisma.blog.update({
      where: {
        id,
      },
      data: updateBlogDto,
    });
  }

  async remove(id: number) {
    return this.prisma.blog.delete({
      where: {
        id,
      },
    });
  }
}
