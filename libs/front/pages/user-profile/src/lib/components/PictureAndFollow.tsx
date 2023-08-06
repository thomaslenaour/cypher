import { Box, Button, SxProps, Typography } from '@cypher/front/shared/ui';

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
    '& > #profile-picture': {
      ...profileStyles,
      height: `${profilePictureHeight}rem`,
      width: '8.125rem',
      borderRadius: '6.25rem',
      marginTop: `-${profilePictureHeight / 2}rem`,
      border: 'solid .3125rem white',
    },
  };
};

interface IPictureAndFollowProps {
  pseudo: string;
  profileUrl?: string | null;
}

export async function PictureAndFollow({
  pseudo,
  profileUrl,
}: IPictureAndFollowProps) {
  return (
    <Box id="picture-and-follow" sx={styles(profileUrl)}>
      {profileUrl ? (
        <Box id="profile-picture" />
      ) : (
        <Box id="profile-picture">
          <Typography level="h1" component="span">
            {pseudo[0].toUpperCase()}
          </Typography>
        </Box>
      )}
      <Button color="primary">Follow</Button>
    </Box>
  );
}
