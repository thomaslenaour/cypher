import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { hash, compare } from 'bcrypt';

import { PasswordEncryptionConfiguration } from '@cypher/api/core';

import {
  PASSWORD_ENCRYPTION_PROVIDER,
  PasswordService,
} from './password.service';

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PasswordService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((): PasswordEncryptionConfiguration => {
              return {
                saltOrRounds: 10,
              };
            }),
          },
        },
        {
          provide: PASSWORD_ENCRYPTION_PROVIDER,
          useValue: {
            hash,
            compare,
          },
        },
      ],
    }).compile();

    passwordService = module.get<PasswordService>(PasswordService);
  });

  it('should be defined', () => {
    expect(passwordService).toBeDefined();
  });

  describe('Password Hashing', () => {
    it('should hash a password', async () => {
      const plainPassword = 'my-super-password';

      const hashedPassword = await passwordService.hashPassword(plainPassword);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).toMatch(/^\$2[ayb]\$.{56}$/);
    });
  });

  describe('Password Comparison', () => {
    it('should not validate the comparison', async () => {
      const plainPassword = 'my-super-password';
      const hashedPassword = await passwordService.hashPassword(plainPassword);

      const isValid = await passwordService.validatePassword(
        'my-super-password-2',
        hashedPassword
      );

      expect(isValid).toBe(false);
    });

    it('should validate the comparison', async () => {
      const plainPassword = 'my-super-password';
      const hashedPassword = await passwordService.hashPassword(plainPassword);

      const isValid = await passwordService.validatePassword(
        plainPassword,
        hashedPassword
      );

      expect(isValid).toBe(true);
    });
  });
});
