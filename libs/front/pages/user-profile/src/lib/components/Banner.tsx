import { Box } from '@cypher/front/shared/ui';
import { SxProps } from '@mui/joy/styles/types';

interface IBannerProps {
  bannerUrl?: string | null;
}

const styles = (bannerUrl: string): SxProps => {
  const bannerStyles: SxProps =
    bannerUrl !== ''
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

export const Banner = async ({ bannerUrl }: IBannerProps) => (
  <Box sx={styles(bannerUrl ?? '')} />
);
