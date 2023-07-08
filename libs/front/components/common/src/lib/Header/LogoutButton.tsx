'use client';

import { signOut } from '@cypher/front/libs/auth';
import { Button } from '@cypher/front/shared/ui';

interface LogoutButtonsProps {
  label: string;
}

export function LogoutButton({ label }: LogoutButtonsProps) {
  return (
    <Button color="danger" onClick={() => signOut()}>
      {label}
    </Button>
  );
}
