import { Controller  , Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class UserController {

  constructor(private readonly userService: UserService) {}

  //LOGIN
  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }

  //CREATE ACCOUNT
  @Post('signup')
  signup(@Body() dto: CreateUserDto) {
    return this.userService.signup(dto);
  }

  
}
