import { IsNotEmpty, IsJSON } from 'class-validator';
import { InputJsonValue } from '@prisma/client/runtime/library';
import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsNotEmpty()
  @IsJSON()
  content: InputJsonValue;
}
