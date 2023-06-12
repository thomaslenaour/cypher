'use client';

import { useSession } from '@cypher/front/libs/auth';
import { Button } from '@cypher/front/shared/ui';
import Link from 'next/link';

export default function OtherPage() {
  const { status, data } = useSession();

  return (
    <>
      <h1>Other Page</h1>
      <p>Session status: {status}</p>
      <p>Session data: {JSON.stringify(data)}</p>
      <Link href="/api/auth/signout">
        <Button>Déconnexion</Button>
      </Link>
    </>
  );
}
