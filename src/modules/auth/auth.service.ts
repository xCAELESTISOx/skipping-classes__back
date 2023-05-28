import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { SignInDTO } from './dto/SignIn.dto';
import { CreateUserDTO } from '../users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private tokenBlacklist: Set<string> = new Set();

  addTokenToBlacklist(token: string): void {
    this.tokenBlacklist.add(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return this.tokenBlacklist.has(token);
  }

  async signUp(userData: CreateUserDTO) {
    const { email, password } = userData;

    // Проверка уникальности электронной почты
    const existingUser = await this.usersService.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание и сохранение пользователя
    return this.usersService.create({
      ...userData,
      password: hashedPassword,
    });
  }

  async signIn(userData: SignInDTO): Promise<string> {
    const user = await this.usersService.findOne({
      email: userData.email,
    });

    // Check if the user exists
    if (user) {
      // Verify the password
      const isPasswordValid = await bcrypt.compare(
        userData.password,
        user.password,
      );

      if (isPasswordValid) {
        // Generate a JWT token
        const token = this.jwtService.sign(
          { id: user.id, username: user.email },
          { secret: process.env.JWT_SECRET_KEY },
        );

        return token;
      }
    }

    throw new UnauthorizedException();
  }
}
