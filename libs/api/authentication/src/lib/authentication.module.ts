import { Module } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

import {
  PASSWORD_ENCRYPTION_PROVIDER,
  PasswordService,
} from './services/password.service';

@Module({
  providers: [
    PasswordService,
    { provide: PASSWORD_ENCRYPTION_PROVIDER, useValue: { hash, compare } },
  ],
})
export class AuthenticationModule {}
