import { Header } from '@cypher/front/components/common/server';
import { NotFound } from './components/NotFound';
import { getProfile } from './queries/getUserProfile';
import { getUser } from './queries/getUser';
import { IUser, IUserProfile } from './interfaces';
import { UserProfile } from './components/UserProfile';

type UserProfilePageParams = {
  pseudo: string;
};

export async function UserProfilePage({
  params,
}: {
  params: UserProfilePageParams;
}) {
  const profile: IUserProfile | null = await getProfile(params.pseudo).catch(
    () => null
  );

  const user: IUser | null = profile
    ? await getUser(profile.userId).catch(() => null)
    : null;

  return (
    <>
      <Header />
      {profile === null || user === null ? (
        <NotFound pseudo={params.pseudo} />
      ) : (
        <UserProfile profile={profile} user={user} />
      )}
    </>
  );
}
