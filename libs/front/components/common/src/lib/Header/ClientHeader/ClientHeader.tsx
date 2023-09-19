'use client';

import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@cypher/front/shared/ui';
import { Menu, User, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { signOut } from '@cypher/front/libs/auth';
import { ModeToggle } from '../ModeToggle/ModeToggle';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  authenticated: boolean;
  pseudo: string | null;
}

function Navigation({ authenticated, pseudo }: NavigationProps) {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: {
            xs: '100%',
            md: 'auto',
          },
        }}
      >
        <Link href="/blog" style={{ width: '100%' }}>
          <Typography level="body-sm">Blog</Typography>
        </Link>
      </Box>
      {authenticated ? (
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={1}
          sx={{
            width: {
              xs: '100%',
              md: 'auto',
            },
          }}
        >
          <Button
            onClick={() => signOut()}
            sx={{
              flex: {
                xs: 1,
                md: 'auto',
              },
            }}
          >
            Se déconnecter
          </Button>
          {pseudo && (
            <IconButton
              variant="soft"
              color="neutral"
              onClick={() => {
                router.push(`/users/${pseudo}`);
              }}
              sx={{
                flex: {
                  xs: 1,
                  md: 'auto',
                },
              }}
            >
              <User />
            </IconButton>
          )}
        </Stack>
      ) : (
        <>
          <Box
            sx={{
              width: {
                xs: '100%',
                md: 'auto',
              },
            }}
          >
            <Link href="/login" style={{ width: '100%' }}>
              <Typography level="body-sm">Se connecter</Typography>
            </Link>
          </Box>
          <Box
            sx={{
              width: {
                xs: '100%',
                md: 'auto',
              },
            }}
          >
            <Link href="/register" style={{ width: '100%' }}>
              <Button
                sx={{
                  width: {
                    xs: '100%',
                    md: 'auto',
                  },
                }}
              >
                S'inscrire
              </Button>
            </Link>
          </Box>
        </>
      )}
      <Box
        sx={{
          width: {
            xs: '100%',
            md: 'auto',
          },
        }}
      >
        <ModeToggle />
      </Box>
    </Box>
  );
}

interface ClientHeaderProps {
  authenticated: boolean;
  pseudo: string | null;
}

export function ClientHeader({ authenticated, pseudo }: ClientHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
        zIndex: 2,
        py: 2,
        backgroundColor: 'background.body',
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link href="/">
            <Typography level="h2" fontStyle="italic" textTransform="uppercase">
              Cypher
            </Typography>
          </Link>
          <Box
            sx={{
              display: {
                xs: 'flex',
                md: 'none',
              },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {menuOpen ? (
              <X
                size="24px"
                onClick={toggleMenu}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <Menu
                size="24px"
                onClick={toggleMenu}
                style={{ cursor: 'pointer' }}
              />
            )}
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Navigation {...{ authenticated, pseudo }} />
          </Box>
        </Box>
        {menuOpen && (
          <Box sx={{ mt: 1, display: { xs: 'block', md: 'none' } }}>
            <Navigation {...{ authenticated, pseudo }} />
          </Box>
        )}
      </Container>
    </Box>
  );
}
