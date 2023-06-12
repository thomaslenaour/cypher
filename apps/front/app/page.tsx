import { Button } from '@cypher/front/shared/ui';
import Link from 'next/link';

export default async function Index() {
  return (
    <>
      <h1>Hello World</h1>
      <Link href="/api/auth/signin">
        <Button>Connexion</Button>
      </Link>
    </>
  );
}
