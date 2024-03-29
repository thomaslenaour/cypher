import { Footer, Header } from '@cypher/front/components/common/server';
import { UserProfile } from './components/UserProfile';
import { UserNotFound } from './components/UserNotFound';
import { getUser, getUserProfile } from '@cypher/front/libs/apollo/server';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

interface UserProfilePageProps {
  params: {
    pseudo: string;
  };
}

export async function UserProfilePage({ params }: UserProfilePageProps) {
  const profile = await getUserProfile('pseudo', params.pseudo).catch(
    () => null
  );
  const user = profile ? await getUser(profile.userId).catch(() => null) : null;
  const displayNotFoundPage = profile === null || user === null;

  return (
    <>
      <Header />
      {displayNotFoundPage ? (
        <UserNotFound pseudo={params.pseudo} />
      ) : (
        <UserProfile profile={profile} user={user} />
      )}
      <Footer />
    </>
  );
}
