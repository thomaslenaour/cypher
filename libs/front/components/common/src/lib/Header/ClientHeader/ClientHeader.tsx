'use client';

import { Box, Container, Typography } from '@cypher/front/shared/ui';
import Link from 'next/link';
import { useState } from 'react';
import { Navigation } from '../Navigation/Navigation';
import { Menu, X } from 'lucide-react';
import { AuthenticationLinks } from '../AuthenticationLinks/AuthenticationLinks';

interface ClientHeaderProps {
  authenticated: boolean;
  pseudo?: string;
}

export function ClientHeader({ authenticated, pseudo }: ClientHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  const AuthenticationLinksComponent = (
    <AuthenticationLinks authenticated={authenticated} pseudo={pseudo} />
  );

  return (
    <Box component="header" sx={{ position: 'relative', zIndex: 2 }}>
      <Container sx={{ py: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Link href="/">
              <Typography
                level="h2"
                fontStyle="italic"
                textTransform="uppercase"
              >
                Cypher
              </Typography>
            </Link>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Navigation
                AuthenticationLinksComponent={AuthenticationLinksComponent}
              />
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {AuthenticationLinksComponent}
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' }, cursor: 'pointer' }}>
            {menuOpen ? (
              <X onClick={toggleMenu} />
            ) : (
              <Menu onClick={toggleMenu} />
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: menuOpen ? 'block' : 'none', md: 'none' },
            position: 'absolute',
            backgroundColor: 'background.body',
            top: '72px',
            left: 0,
            width: '100%',
            pb: 2,
          }}
        >
          <Navigation
            AuthenticationLinksComponent={AuthenticationLinksComponent}
          />
        </Box>
      </Container>
    </Box>
  );
}
