import { Box } from '@cypher/front/shared/ui';
import { SxProps } from '@mui/joy/styles/types';

interface IBannerProps {
  bannerUrl?: string | null;
}

const styles = (bannerUrl?: string | null): SxProps => {
  const bannerStyles: SxProps =
    bannerUrl != null
      ? {
          background: `url("${bannerUrl}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {
          backgroundColor: 'primary.900',
        };

  return {
    ...bannerStyles,
    height: '18.75rem',
  };
};

export async function Banner({ bannerUrl }: IBannerProps) {
  return <Box sx={styles(bannerUrl)} />;
}
