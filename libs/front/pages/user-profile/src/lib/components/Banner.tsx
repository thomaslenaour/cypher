import { Box } from '@cypher/front/shared/ui';
import { SxProps } from '@mui/joy/styles/types';

interface IBannerProps {
  bannerUrl?: string | null;
}

const styles = (bannerUrl?: string | null): SxProps => {
  let bannerStyles: SxProps;

  if (bannerUrl != null) {
    bannerStyles = {
      background: `url("${bannerUrl}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  } else {
    bannerStyles = {
      background: 'primary.main',
    };
  }

  return {
    ...bannerStyles,
    height: '18.75rem',
  };
};

export async function Banner({ bannerUrl }: IBannerProps) {
  return <Box sx={styles(bannerUrl)} />;
}
