import { Module } from '@nestjs/common';

import { JwtStrategy } from './strategies';

@Module({
  providers: [JwtStrategy],
})
export class AuthenticationModule {}
