'use client';

import { Box, Typography } from "@cypher/front/shared/ui";
import React from "react";

export function Catchphrase() {
  return (
    <Box mb={{ xs: 4, md: 8 }}>
      <Typography
        level="h1"
        sx={{
          fontSize: {
            xs: '2.5rem',
            md: '4rem',
          },
          lineHeight: {
            xs: '2.5rem',
            md: '4rem',
          },
        }}
      >
      <Typography sx={{ color: 'primary.500' }}>
        Retrouvez{' '}
      </Typography>
      toutes les dernières{' '}
      <Typography sx={{ color: 'primary.500' }}>
        actualités{' '}
      </Typography>
      sur l'
      <Typography sx={{ color: 'primary.500' }}>
        univers du rap{' '}
      </Typography>
      !{' '}
    </Typography>
  </Box>
  )
}
