import {
  Controller,
  Get,
  Body,
  Patch,
  Query,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { LoginDTO, RegisterDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Body() loginBody: LoginDTO) {
    const res = await this.authService.validateUser(
      loginBody.username,
      loginBody.password,
    );
    return this.authService.certificate(res);
  }

  @Post('/register')
  async register(@Body() registerBody: RegisterDTO) {
    return this.userService.register(registerBody);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async getUser( @Request() req) {
    return this.userService.findUserByUserName(req.user.username);
  }
  @Patch()
  async patchUser(@Body() { username, password }) {
    return this.userService.updatePassword(username, password);
  }
}
