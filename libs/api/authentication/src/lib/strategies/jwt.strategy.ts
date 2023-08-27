import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ApiJwtPayload } from '@cypher/shared/config/authentication';

import { StrategyType } from './startegy.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, StrategyType.JWT) {
  constructor(protected readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('authentication.jwtSecret'),
    });
  }

  async validate(payload: ApiJwtPayload) {
    return { userId: payload.sub };
  }
}
