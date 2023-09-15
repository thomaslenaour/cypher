'use client';

import {
  Card,
  CardContent,
  CardCover,
  Chip,
  Stack,
  Box,
  IconButton,
} from '@cypher/front/shared/ui';
import { Post } from '../../../.contentlayer/generated';
import { Typography } from '@mui/joy';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import React from 'react';

export function PostCard(post: Post) {
  // #231717
  return (
    <Card
      variant="solid"
      sx={{
        height: '100%',
        p: 4,
        borderRadius: '20px',
      }}
    >
      <Link href={`/blog/${post.url}`} style={{ height: '100%' }}>
        <CardCover>
          <img src={post.image} alt="image" />
        </CardCover>
        <CardContent sx={{ justifyContent: 'space-between', height: '100%' }}>
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Stack
              direction="column"
              alignItems="flex-start"
              spacing={1.5}
              sx={{ mb: 5 }}
            >
              <Chip
                sx={{
                  backgroundColor: 'neutral.50',
                }}
              >
                <Typography
                  sx={{
                    color: '#231717',
                  }}
                >
                  <time dateTime={post.date}>
                    {format(parseISO(post.date), 'd LLL, yyyy')}
                  </time>
                </Typography>
              </Chip>
              <Chip
                variant="solid"
                sx={{
                  backgroundColor: 'primary.500',
                }}
              >
                <Typography
                  sx={{
                    color: 'neutral.50',
                  }}
                >
                  {post.tag}
                </Typography>
              </Chip>
            </Stack>
            <IconButton
              variant="outlined"
              color="neutral"
              sx={{
                color: 'white',
                borderRadius: '50%',
                border: 'solid 2px white',
              }}
            >
              <Plus />
            </IconButton>
          </Stack>
          <Box sx={{ zIndex: 1, textAlign: 'right' }}>
            <Typography
              level="h2"
              sx={{
                color: '#231717',
                display: 'inline',
                padding: '6px 12px',
                backgroundColor: 'white',
                boxDecorationBreak: 'clone',
                filter: 'url(#instagram)',
                fontSize: '34px',
                lineHeight: '1.3',
              }}
            >
              {post.title}
            </Typography>
            <svg
              width="0"
              height="0"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
            >
              <defs>
                <filter id="instagram">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="5"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
                    result="goo"
                  />
                  <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
              </defs>
            </svg>
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
}
