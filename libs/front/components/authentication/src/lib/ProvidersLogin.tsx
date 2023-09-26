'use client';

import { signIn } from '@cypher/front/libs/auth';
import { Button, Stack } from '@cypher/front/shared/ui';

interface ProvidersLoginProps {
  providers: {
    id: string;
    name: string;
  }[];
}

export function ProvidersLogin({ providers }: ProvidersLoginProps) {
  return (
    <Stack direction="column" gap={2}>
      {providers.map((provider) => (
        <Button
          key={`provider-${provider.id}`}
          variant="outlined"
          size="lg"
          onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          fullWidth
        >
          Se connecter avec {provider.name}
        </Button>
      ))}
    </Stack>
  );
}
