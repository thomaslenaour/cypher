import Link from 'next/link';

import { Box, Container, Divider, Typography } from '@cypher/front/shared/ui';

import { authOptions, getServerSession } from '@cypher/front/libs/auth/server';
import { HeaderRightComponent } from './RightComponent';

interface HeaderProps {
  authenticated: boolean;
}

export async function Header() {
  const session = await getServerSession(authOptions);

  return <HeaderContent authenticated={!!session} />;
}

function HeaderContent({ authenticated }: HeaderProps) {
  return (
    <Container>
      <Box
        component="header"
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'space-between',
          py: 2,
          px: {
            lg: '0 !important',
          },
        }}
      >
        <Link href="/">
          <Typography level="h2" fontStyle="italic" textTransform="uppercase">
            Cypher
          </Typography>
        </Link>
        <HeaderRightComponent authenticated={authenticated} />
      </Box>
      <Divider />
    </Container>
  );
}

export default Header;
