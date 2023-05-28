import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JWT_SECRET_KEY } from '../../const';

export interface JwtPayload {
  id: number;
  email: string;
}
console.log(process.env.JWT_SECRET_KEY);

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;
    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
