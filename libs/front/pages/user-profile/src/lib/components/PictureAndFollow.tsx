'use client';
import { useMutation } from '@cypher/front/libs/apollo';
import { FollowDocument, UnfollowDocument } from '@cypher/front/shared/graphql';
import { Box, Button, SxProps, Typography } from '@cypher/front/shared/ui';
import { useSession } from 'next-auth/react';
import { IUser } from '../interfaces';
import { useEffect, useState } from 'react';

interface IPictureAndFollowProps {
  user: IUser;
  pseudo: string;
  profileUrl?: string | null;
}

const styles = (profileUrl?: string | null): SxProps => {
  const profilePictureHeight = 8.125; // rem

  const profileStyles: SxProps =
    profileUrl != null
      ? {
          background: `url("${profileUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {
          backgroundColor: 'primary.500',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& > span': {
            color: 'white',
          },
        };

  return {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    '& > .profile-picture': {
      ...profileStyles,
      height: `${profilePictureHeight}rem`,
      width: '8.125rem',
      borderRadius: '6.25rem',
      marginTop: `-${profilePictureHeight / 2}rem`,
    },
  };
};

export function PictureAndFollow({
  user,
  pseudo,
  profileUrl,
}: IPictureAndFollowProps) {
  const { data, status } = useSession();
  const [followMutation] = useMutation(FollowDocument);
  const [unfollowMutation] = useMutation(UnfollowDocument);

  const [currentUserFollowUser, setCurrentUserFollowUser] =
    useState<boolean>(false);

  useEffect(() => {
    setCurrentUserFollowUser(() =>
      Boolean(user.followedBy?.find((u) => u.id === data?.user.id))
    );
  }, [user.followedBy, data?.user.id]);

  const handleFollowClick = async () => {
    if (data?.user?.id == null) return;

    if (!currentUserFollowUser) {
      await followMutation({
        variables: {
          data: {
            followed: user.id,
            following: data?.user?.id,
          },
        },
      }).then(() => {
        setCurrentUserFollowUser(true);
      });
    } else {
      await unfollowMutation({
        variables: {
          data: {
            unfollowed: user.id,
            unfollowing: data?.user?.id,
          },
        },
      }).then(() => {
        setCurrentUserFollowUser(false);
      });
    }
  };

  return (
    <Box sx={styles(profileUrl)}>
      {profileUrl ? (
        <Box className="profile-picture" />
      ) : (
        <Box className="profile-picture">
          <Typography level="h1" component="span">
            {pseudo[0].toUpperCase()}
          </Typography>
        </Box>
      )}
      <Button
        disabled={status !== 'authenticated' || data.user?.id == null}
        color="primary"
        onClick={handleFollowClick}
      >
        {currentUserFollowUser ? 'Unfollow' : 'Follow'}
      </Button>
    </Box>
  );
}
