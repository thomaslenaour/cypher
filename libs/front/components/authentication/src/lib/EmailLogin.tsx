'use client';

import { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@cypher/front/shared/ui';
import { useClientTranslations } from '@cypher/front/libs/i18n';
import { signIn } from '@cypher/front/libs/auth';

export function EmailLogin() {
  const t = useClientTranslations('EmailLogin');
  const [value, setValue] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @TODO: add regex email validation
    signIn('email', { email: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" gap={2}>
        <FormControl>
          <FormLabel>Adresse email</FormLabel>
          <Input
            size="lg"
            type="email"
            placeholder={t('placeholder')}
            value={value}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Button type="submit" size="lg">
          {t('button')}
        </Button>
      </Stack>
    </form>
  );
}
