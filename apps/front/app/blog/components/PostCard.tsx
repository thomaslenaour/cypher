'use client';

import React, { useState } from 'react';
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

export function PostCard(post: Post) {
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  // #231717
  return (
    <Card
      variant="solid"
      sx={{
        height: '100%',
        p: 4,
        borderRadius: '20px',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/blog/${post.url}`} style={{ height: '100%' }}>
        <CardCover sx={{ overflow: 'hidden' }}>
          <img
            src={post.image}
            alt="image"
            style={{
              transform: hover ? 'scale(1.05)' : '',
              transition: 'transform .3s ease',
            }}
          />
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
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#231717' : 'neutral.50',
                }}
              >
                <Typography
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? 'neutral.50' : '#231717',
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
          <Box sx={{ zIndex: 1, textAlign: 'right', textWrap: 'balance' }}>
            <Typography
              level="h2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'neutral.50' : '#231717',
                display: 'inline',
                padding: '6px 12px',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#231717' : 'neutral.50',
                boxDecorationBreak: 'clone',
                filter: 'url(#instagram)',
                fontSize: { xs: '28px', md: '34px' },
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
