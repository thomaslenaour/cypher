import { authOptions, getServerSession } from '@cypher/front/libs/auth/server';
import { ClientHeader } from './ClientHeader/ClientHeader';
import { getUserProfile } from '@cypher/front/libs/apollo/server';

export async function Header() {
  const session = await getServerSession(authOptions);
  let profile = null;

  if (session) {
    profile = await getUserProfile('userId', session.user?.id).catch(
      () => null
    );
  }

  return (
    <ClientHeader
      authenticated={!!session}
      pseudo={profile ? profile.pseudo : undefined}
    />
  );
}

export default Header;
