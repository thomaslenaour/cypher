'use client';

import { useState } from 'react';
import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@cypher/front/shared/ui';
import { signIn } from '@cypher/front/libs/auth';

export function EmailLogin() {
  const [value, setValue] = useState<string>('');
  const [emailSend, setEmailSend] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // @TODO: add regex email validation
    const signed = await signIn('email', {
      email: value,
      redirect: false,
      callbackUrl: '/',
    });

    if (signed?.ok) {
      setEmailSend(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {emailSend ? (
        <Alert color="success" size="md" variant="soft">
          Vérifiez vos emails ! Un lien de connexion a été envoyé à l'adresse{' '}
          {value}
        </Alert>
      ) : (
        <Stack direction="column" gap={2}>
          <FormControl>
            <FormLabel>Adresse email</FormLabel>
            <Input
              size="lg"
              type="email"
              placeholder="Entrez votre adresse email"
              value={value}
              onChange={handleChange}
              required
            />
          </FormControl>
          <Button type="submit" size="lg">
            Recevoir un lien de connexion
          </Button>
        </Stack>
      )}
    </form>
  );
}
