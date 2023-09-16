'use client';
import { Box, Container, Divider, Stack } from '@cypher/front/shared/ui';
import { IUser, IUserProfile } from '../interfaces';
import { Banner } from './Banner';
import { PictureAndFollow } from './PictureAndFollow';
import { Information } from './Information';
import { Insights } from './Insights';
import { useUserProfile } from '../hooks/useUserProfile';

interface UserProfileProps {
  profile: IUserProfile;
  user: IUser;
}

export function UserProfile({ profile, user: defaultUser }: UserProfileProps) {
  const { handleFollowClick, currentUserFollowUser, user } =
    useUserProfile(defaultUser);

  return (
    <Box>
      <Banner bannerUrl={profile.bannerUrl} />
      <Container className="user-profile-header">
        <PictureAndFollow
          pseudo={profile.pseudo}
          profileUrl={profile.profileUrl}
          followButtonLabel={
            currentUserFollowUser ? 'Se désabonner' : "S'abonner"
          }
          handleFollowClick={handleFollowClick}
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
            sx={{
              marginTop: 1,
            }}
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
