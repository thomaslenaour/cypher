import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PasswordEncryptionConfiguration } from '@cypher/api/core';

export interface PasswordEncryptionProvider {
  hash(plainPassword: string, saltOrRounds: number): Promise<string>;
  compare(plainPassword: string, hashedPassword: string): Promise<boolean>;
}

export const PASSWORD_ENCRYPTION_PROVIDER = Symbol(
  'PASSWORD_ENCRYPTION_PROVIDER'
);

@Injectable()
export class PasswordService {
  private passwordEncryptionConfig: PasswordEncryptionConfiguration = {
    saltOrRounds: 10,
  };

  constructor(
    private readonly configService: ConfigService,
    @Inject(PASSWORD_ENCRYPTION_PROVIDER)
    private readonly passwordEncryption: PasswordEncryptionProvider
  ) {
    const passwordEncryptionConfig =
      this.configService.get<PasswordEncryptionConfiguration>(
        'services.passwordEncryption'
      );
    if (passwordEncryptionConfig) {
      this.passwordEncryptionConfig = passwordEncryptionConfig;
    }
  }

  public async hashPassword(plainPassword: string) {
    return this.passwordEncryption.hash(
      plainPassword,
      this.passwordEncryptionConfig.saltOrRounds
    );
  }

  public async validatePassword(plainPassword: string, hashedPassword: string) {
    return this.passwordEncryption.compare(plainPassword, hashedPassword);
  }
}
