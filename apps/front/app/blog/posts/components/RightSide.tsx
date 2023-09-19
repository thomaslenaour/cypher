'use client';

import { Grid, Typography } from '@cypher/front/shared/ui';
import { PostsHelper } from '../../utils/PostsHelper';
import { Post } from '../../../../.contentlayer/generated';
import { PostCard } from '../../components/PostCard';
import React from 'react';

export function RightSide(post: Post) {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        flexGrow: 1,
        position: 'sticky',
        top: '2rem',
        justifyContent: 'center',
      }}
      flexWrap="wrap"
    >
      <Typography level="h2" mb={1}>
        Les dernières news
      </Typography>
      {PostsHelper.getLastThreePostsThatNotTheCurrent(post.title).map(
        (post: Post, idx: number) => (
          <Grid key={idx} xs={12}>
            <PostCard {...post} />
          </Grid>
        )
      )}
    </Grid>
  );
}
