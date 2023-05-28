import {
  Controller,
  Post,
  UseGuards,
  ClassSerializerInterceptor,
  UseInterceptors,
  Headers,
} from '@nestjs/common';

import { SignInDTO } from './dto/SignIn.dto';
import { SignUpDTO } from './dto/signUp.dto';

import JwtAuthenticationGuard from '../../utils/JWTGuard';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(signUpData: SignUpDTO): Promise<User> {
    return this.authService.signUp(signUpData);
  }

  @Post('sign-in')
  signIn(signInData: SignInDTO): Promise<string> {
    return this.authService.signIn(signInData);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('sign-out')
  signOut(@Headers('Authorization') token: string) {
    // Инвалидация токена
    this.authService.addTokenToBlacklist(token);
  }
}
