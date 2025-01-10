import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NewService } from './new.service';
import { CreateNewDto } from './dto/create-new.dto';
import { UpdateNewDto } from './dto/update-new.dto';

@Controller('news')
export class NewController {
  constructor(private readonly newService: NewService) {}

  @Post()
  create(@Body() createNewDto: CreateNewDto) {
    return this.newService.create(createNewDto);
  }

  @Get()
  findAll() {
    return this.newService.findAll();
  }

  @Get('/all')
  findAllNews() {
    return this.newService.findAllNews();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.newService.findBySlug(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewDto: UpdateNewDto) {
    return this.newService.update(+id, updateNewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newService.remove(+id);
  }
}
