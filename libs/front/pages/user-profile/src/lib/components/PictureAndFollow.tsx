import { Box, Button, SxProps } from '@cypher/front/shared/ui';

const styles = (profileUrl?: string | null): SxProps => {
  let profileStyles: SxProps;
  const profilePictureHeight = 8.125; // rem

  if (profileUrl != null) {
    profileStyles = {
      background: `url("${profileUrl}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  } else {
    profileStyles = {
      background: 'secondary.main',
    };
  }

  return {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    '& > div': {
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
  profileUrl?: string | null;
}

export async function PictureAndFollow({ profileUrl }: IPictureAndFollowProps) {
  return (
    <Box id="picture-and-follow" sx={styles(profileUrl)}>
      <Box />
      <Button color="primary">Follow</Button>
    </Box>
  );
}
