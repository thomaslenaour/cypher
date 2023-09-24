import { Box, Typography } from '@cypher/front/shared/ui';
import Link from 'next/link';
import { ReactNode } from 'react';

interface NavigationProps {
  AuthenticationLinksComponent: ReactNode;
}

export function Navigation({ AuthenticationLinksComponent }: NavigationProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'center' },
        px: 2,
        gap: { xs: 2, md: 2.5 },
      }}
    >
      <Box>
        <Link href="/#what-is-cypher">
          <Typography level="body-sm">Qu'est-ce que Cypher ?</Typography>
        </Link>
      </Box>
      <Box>
        <Link href="/#how-it-works">
          <Typography level="body-sm">Comment ça marche ?</Typography>
        </Link>
      </Box>
      <Box>
        <Link href="/blog">
          <Typography level="body-sm">Blog</Typography>
        </Link>
      </Box>
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {AuthenticationLinksComponent}
      </Box>
    </Box>
  );
}
