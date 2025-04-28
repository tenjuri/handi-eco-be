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
import { JwtAuthGuard, RootAdminJwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/one/:id')
  // @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @User() user: any) {
    return this.userService.findOne(id);
  }

  @Post('/create')
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

  @Post('/update-password/:id')
  @UseGuards(RootAdminJwtAuthGuard)
  update(@Param('id') id: string, @Body() data: any) {
    return this.userService.updatePassword(id, data);
  }

  @Post('/update-information/:id')
  @UseGuards(RootAdminJwtAuthGuard)
  updateInformation(@Param('id') id: string, @Body() data: any) {
    return this.userService.updateInformation(id, data);
  }

  @Get('/all')
  @UseGuards(RootAdminJwtAuthGuard)
  getAll() {
    return this.userService.getAll();
  }
}
