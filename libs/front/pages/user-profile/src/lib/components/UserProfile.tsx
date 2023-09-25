'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
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
    handleUpdateProfileUrl,
    handleUpdateBannerUrl,
  } = useUserProfile(defaultUser, profile);

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      <Box>
        <Banner
          pseudo={userProfile.pseudo}
          handleUpdateBannerUrl={handleUpdateBannerUrl}
          bannerUrl={userProfile.bannerUrl ?? null}
          currentUserIsOnHisProfilePage={currentUserIsOnHisProfilePage}
        />
        <Container>
          <Box className="user-profile-header">
            <ProfilePicture
              currentUserIsOnHisProfilePage={currentUserIsOnHisProfilePage}
              pseudo={userProfile.pseudo}
              profileUrl={userProfile.profileUrl ?? null}
              handleUpdateProfileUrl={handleUpdateProfileUrl}
            />
            <Stack
              direction={{
                xs: 'column',
                md: 'row',
              }}
              justifyContent={{
                xs: 'none',
                md: 'space-between',
              }}
              alignItems={'start'}
              gap={3}
              my={2}
            >
              <Information
                createdAt={userProfile.createdAt}
                pseudo={userProfile.pseudo}
                punchline={userProfile.punchline}
                name={userProfile.name}
                sx={{ flex: 1 }}
              />
              <Stack direction={'column'} gap={1} sx={{ flex: 1 }}>
                <Insights
                  followers={user.followedBy ?? []}
                  followings={user.following ?? []}
                />
                <ActionButtons
                  currentUserFollowUser={currentUserFollowUser}
                  currentUserIsOnHisProfilePage={currentUserIsOnHisProfilePage}
                  sessionStatus={sessionStatus}
                  handleFollowClick={handleFollowClick}
                  handleOpenUpdateModal={handleOpenUpdateModal}
                />
              </Stack>
            </Stack>
            <Divider sx={{ marginY: 1 }} />
          </Box>
          <Box>
            <Typography my={2}>Tes tracks (bientôt disponible)</Typography>
          </Box>
        </Container>
      </Box>
      <UpdateProfileModal
        open={openUpdateModal}
        pseudo={userProfile.pseudo}
        name={userProfile.name ? userProfile.name : userProfile.pseudo}
        punchline={userProfile.punchline ?? ''}
        handleClose={handleCloseUpdateModal}
        handleSubmit={handleUpdateProfileSubmit}
      />
    </>
  );
}
