'use client';

import { LeftSide } from './LeftSide';
import { RightSide } from './RightSide';
import { Stack } from '@cypher/front/shared/ui';
import React from 'react';

export function HighlightedPosts() {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={4}
      mt={{ xs: 5, md: 10 }}
      sx={{ minHeight: '80vh' }}
    >
      <LeftSide />
      <RightSide />
    </Stack>
  );
}
