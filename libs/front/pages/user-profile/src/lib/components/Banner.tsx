import { Box } from '@cypher/front/shared/ui';

interface BannerProps {
  bannerUrl: string | null;
}
export const Banner = ({ bannerUrl }: BannerProps) => (
  <Box
    sx={{
      ...(bannerUrl
        ? {
            background: `url("${bannerUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
        : {
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.400',
          }),
      height: {
        sm: '18.75rem',
        xs: '12.5rem',
      },
    }}
  />
);
