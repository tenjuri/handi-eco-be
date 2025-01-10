import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { RootAdminJwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('/new')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get('/all')
  findAllBlogs() {
    return this.blogService.findAllBlogs();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.blogService.findBlogBySlug(slug);
  }

  @Post('/publish/:slug')
  @UseGuards(RootAdminJwtAuthGuard)
  publish(@Param('slug') slug: string) {
    return this.blogService.publish(slug);
  }

  @Post('/update/:slug')
  update(@Param('slug') slug: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(slug, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
