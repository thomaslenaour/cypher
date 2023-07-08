import Link from 'next/link';

import { Box, Container, Typography } from '@cypher/front/shared/ui';

import { useServerTranslations } from '@cypher/front/libs/i18n/server';

import { Navigation } from './Navigation';
import { HeaderRightComponent } from './RightComponent';
import { authOptions, getServerSession } from '@cypher/front/libs/auth/server';

interface HeaderProps {
  authenticated: boolean;
}

export async function Header() {
  const session = await getServerSession(authOptions);

  return <HeaderContent authenticated={!!session} />;
}

function HeaderContent({ authenticated }: HeaderProps) {
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
  const headerRihtComponentsTranslations = {
    login: t('Header.login'),
    register: t('Header.register'),
    logout: t('Header.logout'),
  };

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
          <HeaderRightComponent
            authenticated={authenticated}
            translations={headerRihtComponentsTranslations}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
