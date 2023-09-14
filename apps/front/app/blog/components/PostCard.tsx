'use client';

import {
  Card,
  CardContent,
  CardCover,
  Chip,
  Stack,
  Box,
} from '@cypher/front/shared/ui';
import { Post } from '../../../.contentlayer/generated';
import { Typography } from '@mui/joy';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

export function PostCard(post: Post) {
  return (
    <Card
      variant="solid"
      sx={{
        height: '100%',
        p: 4,
        borderRadius: '20px',
      }}
    >
      <Link href={`/blog/${post.url}`}>
        <CardCover>
          <img src={post.image} alt="image" />
        </CardCover>
        <CardContent>
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
                  color: 'black',
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
          <Box sx={{ zIndex: 1 }}>
            <Typography
              level="h2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? 'white' : 'black',
                display: 'inline',
                padding: '6px 12px',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'black' : 'white',
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
