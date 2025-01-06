import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: number, @User() user: any) {
    return this.userService.findOne(Number(id));
  }

  @Post('/create')
  // @UseGuards(JwtAuthGuard)
  create(
    @Body()
    data: {
      name: string;
      userName: string;
      password: string;
      isAdmin: boolean;
      isRootAdmin: boolean;
    },
  ) {
    return this.userService.create(data);
  }

  @Post('update/:id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: number, @Body() data: any) {
    return this.userService.update(id, data);
  }
}
