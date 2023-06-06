'use client';

import { SessionProvider } from 'next-auth/react';
import View from './components/View';
import Link from 'next/link';
import { FRONT_ACCESS_TOKEN_REFETCH_INTERVAL_IN_SECONDS } from '@cypher/shared/config/authentication';

export default async function Index() {
  return (
    <SessionProvider
      refetchInterval={FRONT_ACCESS_TOKEN_REFETCH_INTERVAL_IN_SECONDS}
      refetchOnWindowFocus
    >
      <p>Welcome to Cypher App!</p>
      <Link href="/other">go</Link>
      <View />
    </SessionProvider>
  );
}
