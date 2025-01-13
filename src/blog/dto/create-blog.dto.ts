import { InputJsonValue } from '@prisma/client/runtime/library';
export class CreateBlogDto {
  title: string;
  description: string;
  content: InputJsonValue;
  banner: string;
}
