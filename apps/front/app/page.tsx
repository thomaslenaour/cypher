'use client';

import { SessionProvider } from 'next-auth/react';
import View from './components/View';

export default async function Index() {
  return (
    <SessionProvider>
      <p>Welcome to Cypher App!</p>
      <View />
    </SessionProvider>
  );
}
