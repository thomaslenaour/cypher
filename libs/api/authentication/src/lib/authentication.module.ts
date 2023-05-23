import { Module } from '@nestjs/common';

import { PasswordService } from './services/password.service';

@Module({
  providers: [PasswordService],
})
export class AuthenticationModule {}
