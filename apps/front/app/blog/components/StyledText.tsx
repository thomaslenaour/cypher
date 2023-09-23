'use client';

import { Box, Typography } from '@cypher/front/shared/ui';
import React from 'react';

export function CatchPhrase() {
  return (
    <Box mb={{ xs: 4, md: 8 }}>
      <Typography
        level="h1"
        sx={{
          fontSize: {
            xs: '3rem',
            md: '3.5rem',
          },
          lineHeight: {
            xs: '3rem',
            md: '4rem',
          },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography sx={{ color: 'primary.500' }}>Toutes </Typography>
        les dernières{' '}
        <Typography sx={{ color: 'primary.500' }}>actualités </Typography>
        sur l&apos;
        <Typography sx={{ color: 'primary.500' }}>
          univers du rap{' '}
        </Typography>{' '}
        sont sur <Typography sx={{ color: 'primary.500' }}>Cypher </Typography>!
      </Typography>
    </Box>
  );
}

export function SeeMoreText() {
  return (
    <Box mb={{ xs: 4, md: 6 }}>
      <Typography
        level="h3"
        fontWeight="bold"
        sx={{
          fontSize: {
            xs: '2.5rem',
            md: '3rem',
          },
          lineHeight: {
            xs: '3rem',
            md: '4rem',
          },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography sx={{ color: 'primary.500' }}>Psst </Typography>! Pour
        encore{' '}
        <Typography sx={{ color: 'primary.500' }}>
          plus d&apos;articles
        </Typography>
        , c&apos;est par{' '}
        <Typography sx={{ color: 'primary.500' }}>ici </Typography>!
      </Typography>
    </Box>
  );
}
