import Link from 'next/link';

import { Box, Button, Container, Typography } from '@cypher/front/shared/ui';

import { Navigation } from './Navigation';

export function Header() {
  return (
    <Box component="header" py={3}>
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
          <Navigation />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button variant="outlined" color="neutral">
              Connexion
            </Button>
            <Button>Inscription</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
