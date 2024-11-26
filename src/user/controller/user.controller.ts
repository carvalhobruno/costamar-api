import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Public } from '../../auth//decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.register(email, password);
  }
}
