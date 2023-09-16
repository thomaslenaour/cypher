import { Header } from '@cypher/front/components/common/server';
import { getProfile } from './queries/getUserProfile';
import { getUser } from './queries/getUser';
import { UserProfile } from './components/UserProfile';
import { UserNotFound } from './components/UserNotFound';

interface UserProfilePageProps {
  params: {
    pseudo: string;
  };
}

export async function UserProfilePage({ params }: UserProfilePageProps) {
  const profile = await getProfile(params.pseudo).catch(() => null);
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
    </>
  );
}
