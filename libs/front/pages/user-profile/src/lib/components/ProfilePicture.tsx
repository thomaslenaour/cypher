'use client';
import { Box, Typography } from '@cypher/front/shared/ui';

const PROFILE_PICTURE_SIZE = {
  sm: 8.125,
  xs: 7,
};

interface ProfilePictureProps {
  pseudo: string;
  profileUrl?: string | null;
}

export function ProfilePicture({ pseudo, profileUrl }: ProfilePictureProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'space-between',
        '& > .profile-picture': {
          ...(profileUrl != null
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
              }),
          height: {
            sm: `${PROFILE_PICTURE_SIZE.sm}rem`,
            xs: `${PROFILE_PICTURE_SIZE.xs}rem`,
          },
          width: {
            sm: `${PROFILE_PICTURE_SIZE.sm}rem`,
            xs: `${PROFILE_PICTURE_SIZE.xs}rem`,
          },
          borderRadius: '6.25rem',
          marginTop: {
            sm: `-${PROFILE_PICTURE_SIZE.sm / 2}rem`,
            xs: `-${PROFILE_PICTURE_SIZE.xs / 2}rem`,
          },
        },
      }}
    >
      {profileUrl ? (
        <Box className="profile-picture" />
      ) : (
        <Box className="profile-picture">
          <Typography level="h1" component="span">
            {pseudo[0].toUpperCase()}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
