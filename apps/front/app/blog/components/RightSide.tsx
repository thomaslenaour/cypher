'use client';

import { Box, Stack } from '@cypher/front/shared/ui';
import React from 'react';
import { PostCard } from './PostCard';
import { PostsHelper } from '../utils/PostsHelper';
import { Post } from '../../../.contentlayer/generated';

export function RightSide() {
  const lastTwoPostsNotHighlighted = PostsHelper.getHighlightedPosts();

  return (
    <Box sx={{ minWidth: '35%' }}>
      <Stack direction="column" spacing={4} sx={{ height: '100%' }}>
        {lastTwoPostsNotHighlighted.map((post: Post, idx: number) => (
          <PostCard key={idx} {...post} />
        ))}
      </Stack>
    </Box>
  );
}
