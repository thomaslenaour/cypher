import { Module } from '@nestjs/common';

import { JwtStrategy } from './strategies';
import { TestController } from './controller';

@Module({
  controllers: [TestController],
  providers: [JwtStrategy],
})
export class AuthenticationModule {}
