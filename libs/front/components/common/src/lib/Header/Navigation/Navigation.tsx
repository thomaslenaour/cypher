import Link from 'next/link';

import { Box, Typography } from '@cypher/front/shared/ui';
import { useServerTranslations } from '@cypher/front/libs/i18n/server';

export function Navigation() {
  const t = useServerTranslations('Navigation');
  const links = {
    rooms: {
      label: t('links.rooms'),
      href: '/rooms',
    },
    events: {
      label: t('links.events'),
      href: '/events',
    },
    aboutUs: {
      label: t('links.aboutUs'),
      href: '/about-us',
    },
    blog: {
      label: t('links.blog'),
      href: '/blog',
    },
  };

  return (
    <Box component="nav">
      <Box
        component="ul"
        sx={{
          display: 'flex',
          alignItems: 'center',
          listStyle: 'none',
          padding: 0,
          gap: 3,
        }}
      >
        {Object.entries(links).map(([key, { label, href }]) => (
          <Typography key={key} component="li">
            <Link href={href}>{label}</Link>
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default Navigation;
