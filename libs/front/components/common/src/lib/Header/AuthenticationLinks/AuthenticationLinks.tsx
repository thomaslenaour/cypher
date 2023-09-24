'use client';

import Link from 'next/link';
import { User } from 'lucide-react';

import { Box, Button, IconButton } from '@cypher/front/shared/ui';
import { signOut } from '@cypher/front/libs/auth';

import { ModeToggle } from '../ModeToggle/ModeToggle';

interface AuthenticationLinksProps {
  authenticated?: boolean;
  pseudo?: string;
}

export function AuthenticationLinks({
  authenticated,
  pseudo,
}: AuthenticationLinksProps) {
  return (
    <Box
      sx={{
        display: { xs: 'grid', md: 'flex' },
        gridTemplateColumns: 'repeat(3, 1fr)',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {!authenticated && (
        <Box width="100%">
          <Link href="/login" style={{ width: '100%' }}>
            <Button variant="plain" color="neutral" fullWidth>
              Connexion
            </Button>
          </Link>
        </Box>
      )}
      {!authenticated && (
        <Box width="100%">
          <Link href="/register" style={{ width: '100%' }}>
            <Button variant="solid" color="primary" fullWidth>
              Inscription
            </Button>
          </Link>
        </Box>
      )}
      {authenticated && (
        <Box width="100%">
          <Button
            onClick={() => signOut()}
            variant="solid"
            color="primary"
            fullWidth
          >
            Déconnexion
          </Button>
        </Box>
      )}
      {authenticated && pseudo && (
        <Box width="100%">
          <Link href={`/users/${pseudo}`} style={{ width: '100%' }}>
            <IconButton
              variant="soft"
              color="neutral"
              sx={{
                width: { xs: '100%', md: 'auto' },
                flex: {
                  xs: 1,
                  md: 'auto',
                },
              }}
            >
              <User />
            </IconButton>
          </Link>
        </Box>
      )}
      <Box width="100%">
        <ModeToggle />
      </Box>
    </Box>
  );
}
