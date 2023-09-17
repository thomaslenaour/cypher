'use client';

import { Box, Button, Container, Typography } from '@cypher/front/shared/ui';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { signOut } from '@cypher/front/libs/auth';
import { ModeToggle } from '../ModeToggle/ModeToggle';

interface NavigationProps {
  authenticated: boolean;
}

function Navigation({ authenticated }: NavigationProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        gap: {
          xs: 1,
          md: 2,
        },
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
        <Box
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
              width: {
                xs: '100%',
                md: 'auto',
              },
            }}
          >
            Se déconnecter
          </Button>
        </Box>
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
}

export function ClientHeader({ authenticated }: ClientHeaderProps) {
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
            <Navigation authenticated={authenticated} />
          </Box>
        </Box>
        {menuOpen && (
          <Box sx={{ mt: 1, display: { xs: 'block', md: 'none' } }}>
            <Navigation authenticated={authenticated} />
          </Box>
        )}
      </Container>
    </Box>
  );
}
