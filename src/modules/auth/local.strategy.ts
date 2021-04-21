import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { throwException } from '@/utils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log(username, password);
    const user = await this.authService.validateUser(username, password);
    console.log(user);
    if (!user) {
      throwException('密码或账号错误，请重试', 403);
    }
    return user;
  }
}
