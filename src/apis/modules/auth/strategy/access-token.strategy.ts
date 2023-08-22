import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UconnectServiceConstant } from 'src/constants/uconnectConstant';
import { JwtPayloadType } from 'src/model/jwt/payload';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access'
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: UconnectServiceConstant.JWT_ACCESS_SECRET,
    });
  }

  validate(payload: JwtPayloadType) {
    return payload;
  }
}
