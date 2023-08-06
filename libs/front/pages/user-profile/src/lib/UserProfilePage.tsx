import { Header } from '@cypher/front/components/common/server';
import {
  Box,
  Container,
  Divider,
  Stack,
  SxProps,
} from '@cypher/front/shared/ui';
import { Banner } from './components/Banner';
import { PictureAndFollow } from './components/PictureAndFollow';
import { Information } from './components/Information';
import { Insights } from './components/Insights';
import { NotFound } from './components/NotFound';
import { getProfile } from './services/getUserProfile';
import { getUser } from './services/getUser';

export type UserProfile = {
  id: string;
  createdAt: Date;
  bannerUrl?: string | null;
  profileUrl?: string | null;
  pseudo: string;
  punchline?: string | null;
  userName?: string | null;
  userId: string;
};

export type User = {
  id: string;
  followedBy?: User[] | null;
};

const styles: SxProps = {
  '& > #user-profile-header': {
    '& > #user-profile-header-information-insights': {
      marginTop: '10px',
      '& > #user-profile-header-information': {},
    },
  },
};

interface IUserProfilePageParams {
  pseudo: string;
}

export async function UserProfilePage({
  params,
}: {
  params: IUserProfilePageParams;
}) {
  const profile: UserProfile | null = await getProfile(params.pseudo).catch(
    () => null
  );

  const user: User | null = profile
    ? await getUser(profile.userId).catch(() => null)
    : null;

  return (
    <>
      <Header />
      {profile === null || user === null ? (
        <NotFound pseudo={params.pseudo} />
      ) : (
        <Box sx={styles}>
          <Banner bannerUrl={profile.bannerUrl} />
          <Container id="user-profile-header">
            <PictureAndFollow
              pseudo={profile.pseudo}
              profileUrl={profile.profileUrl}
            />
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              id="user-profile-header-information-insights"
            >
              <Information
                createdAt={profile.createdAt}
                pseudo={profile.pseudo}
                punchline={profile.punchline ?? undefined}
                userName={profile.userName ?? undefined}
              />
              <Insights
                participations={20}
                followers={user?.followedBy?.length ?? 0}
              />
            </Stack>
            <Divider />
          </Container>
        </Box>
      )}
    </>
  );
}
