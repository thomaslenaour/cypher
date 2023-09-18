'use client';

import { IconButton } from '@cypher/front/shared/ui';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export function BackButton() {
  return (
    <Link href="/blog">
      <IconButton
        variant="outlined"
        color="neutral"
        sx={{
          backdropFilter: 'blur(10px)',
          color: (theme) =>
            theme.palette.mode === 'dark' ? 'neutral.50' : 'black',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'black' : 'neutral.50',
          borderRadius: '50%',
          border: 'solid 2px',
        }}
      >
        <ArrowLeft />
      </IconButton>
    </Link>
  );
}
