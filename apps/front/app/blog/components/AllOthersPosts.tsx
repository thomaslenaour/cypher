'use client';

import { SeeMoreText } from './StyledText';
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@cypher/front/shared/ui';
import { PostsHelper } from '../utils/PostsHelper';
import { Post } from '../../../.contentlayer/generated';
import { PostCard } from './PostCard';
import React, { useState } from 'react';

export function AllOthersPosts() {
  const allPostsTags = PostsHelper.getAllPostsTags();
  // const allTagsWithAllTag = cloneDeep(allPostsTags);
  allPostsTags.unshift('Tous');
  const [selectedTags, setSelectedTags] = useState(['Tous']);

  // Crade, à améliorer si le temps
  const handleTagsFilter = (tag: string) => {
    let tagsToSelected: string[] = selectedTags;

    if (tag === 'Tous') {
      tagsToSelected = ['Tous'];
    } else if (selectedTags.includes(tag)) {
      tagsToSelected = selectedTags.filter(
        (selectedTag) => selectedTag !== tag
      );
    } else {
      tagsToSelected = [...tagsToSelected, tag];
      if (tagsToSelected[0] === 'Tous') {
        tagsToSelected.shift();
      }
    }

    if (!tagsToSelected.length) {
      tagsToSelected = ['Tous'];
    }

    setSelectedTags(tagsToSelected);
  };

  return (
    <Box>
      <SeeMoreText />
      <Stack direction="row" spacing={1} mb={2}>
        {allPostsTags.map((tag: string, idx: number) => (
          <IconButton
            value={tag}
            onClick={(e) => {
              handleTagsFilter(e.currentTarget.value);
            }}
            key={idx}
            sx={{
              borderRadius: '50px',
              px: '15px',
              backgroundColor: selectedTags.includes(tag)
                ? 'none'
                : 'primary.500',
              border: '2px solid',
              borderColor: selectedTags.includes(tag)
                ? (theme) =>
                    theme.palette.mode === 'dark' ? 'neutral.50' : 'black'
                : 'transparent',
            }}
          >
            <Typography
              level="body-md"
              sx={{
                color: selectedTags.includes(tag)
                  ? (theme) =>
                      theme.palette.mode === 'dark' ? 'neutral.50' : 'black'
                  : 'white',
              }}
            >
              {tag}
            </Typography>
          </IconButton>
        ))}
      </Stack>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        {PostsHelper.getAllPostsMatchWithTags(selectedTags).map(
          (post: Post, idx: number) => (
            <Grid key={idx} xs={12} md={6} lg={4}>
              <PostCard key={idx} {...post} />
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}
