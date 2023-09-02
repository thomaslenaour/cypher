'use client';
import { Box, Button, SxProps, Typography } from '@cypher/front/shared/ui';
import { useSession } from 'next-auth/react';

interface IPictureAndFollowProps {
  userId: string;
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
      border: 'solid .3125rem white',
    },
  };
};

export function PictureAndFollow({
  userId,
  pseudo,
  profileUrl,
}: IPictureAndFollowProps) {
  const { data, status } = useSession();

  const handleFollowClick = () => {
    console.log(`${data?.user?.id} start to follow ${userId}`);
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
        Follow
      </Button>
    </Box>
  );
}
