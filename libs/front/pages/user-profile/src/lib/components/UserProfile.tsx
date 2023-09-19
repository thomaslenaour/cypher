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
import { UpdateProfileModal } from './UpdateProfile/Modal';

interface UserProfileProps {
  profile: IUserProfile;
  user: IUser;
}

export function UserProfile({ profile, user: defaultUser }: UserProfileProps) {
  const {
    currentUserFollowUser,
    currentUserIsOnHisProfilePage,
    user,
    userProfile,
    sessionStatus,
    openUpdateModal,
    handleCloseUpdateModal,
    handleFollowClick,
    handleOpenUpdateModal,
    handleUpdateProfileSubmit,
  } = useUserProfile(defaultUser, profile);

  return (
    <>
      <Box>
        <Banner bannerUrl={userProfile.bannerUrl ?? null} />
        <Container>
          <Box className="user-profile-header">
            <ProfilePicture
              pseudo={userProfile.pseudo}
              profileUrl={userProfile.profileUrl}
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
                createdAt={userProfile.createdAt}
                pseudo={userProfile.pseudo}
                punchline={userProfile.punchline}
                name={userProfile.name}
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
                    handleOpenUpdateModal,
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
      <UpdateProfileModal
        open={openUpdateModal}
        name={userProfile.name ? userProfile.name : userProfile.pseudo}
        punchline={userProfile.punchline ?? ''}
        handleClose={handleCloseUpdateModal}
        handleSubmit={handleUpdateProfileSubmit}
      />
    </>
  );
}
