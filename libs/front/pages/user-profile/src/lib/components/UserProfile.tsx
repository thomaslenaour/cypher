'use client';
import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
} from '@cypher/front/shared/ui';
import { IUser, IUserProfile } from '../interfaces';
import { Banner } from './Banner';
import { ProfilePicture } from './ProfilePicture';
import { Information } from './Information';
import { Insights } from './Insights';
import { useUserProfile } from '../hooks/useUserProfile';
import { ActionButtons } from './ActionButtons';

interface UserProfileProps {
  profile: IUserProfile;
  user: IUser;
}

export function UserProfile({ profile, user: defaultUser }: UserProfileProps) {
  const {
    handleFollowClick,
    currentUserFollowUser,
    currentUserIsOnHisProfilePage,
    user,
    sessionStatus,
  } = useUserProfile(defaultUser);

  return (
    <Box>
      <Banner bannerUrl={profile.bannerUrl ?? null} />
      <Container>
        <Box className="user-profile-header">
          <ProfilePicture
            pseudo={profile.pseudo}
            profileUrl={profile.profileUrl}
          />
          <Stack
            direction={{
              sm: 'row',
              xs: 'column',
            }}
            justifyContent={{
              sm: 'space-between',
              xs: 'none',
            }}
            alignItems={{
              sm: 'center',
              xs: 'start',
            }}
            className="user-profile-header-information-insights"
          >
            <Information
              createdAt={profile.createdAt}
              pseudo={profile.pseudo}
              punchline={profile.punchline}
              userName={profile.userName}
              sx={{
                marginTop: 1,
              }}
            />
            <Stack direction={'column'} justifyContent={'flex-end'} gap={1}>
              <Insights
                contributions={20}
                followers={user?.followedBy?.length ?? 0}
              />
              <ActionButtons
                {...{
                  currentUserFollowUser,
                  currentUserIsOnHisProfilePage,
                  sessionStatus,
                  handleFollowClick,
                }}
              />
            </Stack>
          </Stack>
          <Divider sx={{ marginTop: 1 }} />
        </Box>
        <Box>
          <Typography mt={2}>
            Les tracks de l'utilisateur seront listées ici
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
