'use client';
import { Box, Container, Divider, Stack } from '@cypher/front/shared/ui';
import { IUser, IUserProfile } from '../interfaces';
import { Banner } from './Banner';
import { PictureAndFollow } from './PictureAndFollow';
import { Information } from './Information';
import { Insights } from './Insights';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { FollowDocument, UnfollowDocument } from '@cypher/front/shared/graphql';

interface UserProfileProps {
  profile: IUserProfile;
  user: IUser;
}

export function UserProfile({ profile, user: defaultUser }: UserProfileProps) {
  const [user, setUser] = useState<IUser>(defaultUser);
  const { data: sessionData } = useSession();
  const [currentUserFollowUser, setCurrentUserFollowUser] =
    useState<boolean>(false);
  const [followMutation] = useMutation(FollowDocument);
  const [unfollowMutation] = useMutation(UnfollowDocument);

  useEffect(() => {
    setCurrentUserFollowUser(() =>
      Boolean(user.followedBy?.find((u) => u.id === sessionData?.user.id))
    );
  }, [user.followedBy, sessionData?.user.id]);

  const handleFollowClick = async () => {
    if (sessionData?.user?.id == null) return;

    if (!currentUserFollowUser) {
      await followMutation({
        variables: {
          data: {
            followed: user.id,
            following: sessionData?.user?.id,
          },
        },
      }).then((u) => {
        if (u.data) {
          setUser(u.data?.follow);
        }

        setCurrentUserFollowUser(true);
      });
    } else {
      await unfollowMutation({
        variables: {
          data: {
            unfollowed: user.id,
            unfollowing: sessionData?.user?.id,
          },
        },
      }).then((u) => {
        if (u.data) {
          setUser(u.data?.unfollow);
        }

        setCurrentUserFollowUser(false);
      });
    }
  };

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
