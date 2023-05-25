import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

import { StrategyType } from './startegy.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyType.JWT) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'TbFqINAhOgF3BlNPbGbQgBsdaSIMTn7FmXygZ34LdoU=',
    });
  }

  async validate(payload: any) {
    console.log('payload', payload);
    return { userId: payload.sub };
  }
}
