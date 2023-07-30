import { Header } from '@cypher/front/components/common/server';
import { UserProfile } from './components/UserProfile';

interface IUserProfilePageParams {
  pseudo: string;
}

export async function UserProfilePage({
  params,
}: {
  params: IUserProfilePageParams;
}) {
  return (
    <>
      <Header />
      <UserProfile pseudo={params.pseudo} />
    </>
  );
}
