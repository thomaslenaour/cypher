'use client';

import View from './components/View';
import Link from 'next/link';
import { Button } from '@cypher/front/shared/ui';

export default async function Index() {
  return (
    <>
      <Button variant="outlined">Click me</Button>
      <p>Welcome to Cypher App!</p>
      <Link href="/other">hello worldd</Link>
      <View />
    </>
  );
}
