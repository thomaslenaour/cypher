import Link from 'next/link';

import { Box, Button, Container, Typography } from '@cypher/front/shared/ui';

import { useServerTranslations } from '@cypher/front/libs/i18n/server';

import { Navigation } from './Navigation';

export function Header() {
  const t = useServerTranslations();
  const links = {
    rooms: {
      label: t('Navigation.links.rooms'),
      href: '/rooms',
    },
    events: {
      label: t('Navigation.links.events'),
      href: '/events',
    },
    aboutUs: {
      label: t('Navigation.links.aboutUs'),
      href: '/about-us',
    },
    blog: {
      label: t('Navigation.links.blog'),
      href: '/blog',
    },
  };

  console.log('links', links);

  return (
    <Box component="header" sx={{ py: 3, backgroundColor: 'common.white' }}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/">
            <Typography
              level="h3"
              fontWeight={800}
              fontStyle="italic"
              textTransform="uppercase"
            >
              Cypher
            </Typography>
          </Link>
          <Navigation links={links} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="outlined" color="neutral">
              {t('Header.login.cta')}
            </Button>
            <Button>{t('Header.register.cta')}</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
