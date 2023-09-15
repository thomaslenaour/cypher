'use client';

import { Box, Stack } from '@cypher/front/shared/ui';
import React from 'react';
import { PostCard } from './PostCard';
import { PostsHelper } from '../utils/PostsHelper';

export function RightSide() {
  const highlightPost = PostsHelper.getAllPostsSortedByDate();

  return (
    <Box sx={{ minWidth: '35%' }}>
      <Stack direction="column" spacing={4} sx={{ height: '100%' }}>
        <PostCard {...highlightPost[0]} />
        <PostCard {...highlightPost[1]} />
      </Stack>
    </Box>
  );
}
