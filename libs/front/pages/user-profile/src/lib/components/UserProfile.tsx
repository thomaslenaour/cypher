import { Box, Container, Divider, Stack } from '@cypher/front/shared/ui';
import { IUser, IUserProfile } from '../interfaces';
import { Banner } from './Banner';
import { PictureAndFollow } from './PictureAndFollow';
import { Information } from './Information';
import { Insights } from './Insights';

interface IUserProfileProps {
  profile: IUserProfile;
  user: IUser;
}

export async function UserProfile({ profile, user }: IUserProfileProps) {
  return (
    <Box>
      <Banner bannerUrl={profile.bannerUrl} />
      <Container className="user-profile-header">
        <PictureAndFollow
          userId={user.id}
          pseudo={profile.pseudo}
          profileUrl={profile.profileUrl}
        />
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          className="user-profile-header-information-insights"
        >
          <Information
            createdAt={profile.createdAt}
            pseudo={profile.pseudo}
            punchline={profile.punchline ?? undefined}
            userName={profile.userName ?? undefined}
          />
          <Insights
            contributions={20}
            followers={user?.followedBy?.length ?? 0}
          />
        </Stack>
        <Divider />
      </Container>
    </Box>
  );
}
