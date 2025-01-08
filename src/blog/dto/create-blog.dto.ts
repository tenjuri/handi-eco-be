import { InputJsonValue } from '@prisma/client/runtime/library';
export class CreateBlogDto {
  title: string;
  content: InputJsonValue;
}
