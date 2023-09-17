import { authOptions, getServerSession } from '@cypher/front/libs/auth/server';
import { ClientHeader } from './ClientHeader/ClientHeader';

export async function Header() {
  const session = await getServerSession(authOptions);

  return <ClientHeader authenticated={!!session} />;
}

export default Header;
