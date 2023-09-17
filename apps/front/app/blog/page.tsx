import { Footer, Header } from '@cypher/front/components/common';
import React from 'react';
import { Box, Container, Divider, Stack } from '@cypher/front/shared/ui';
import { SvgBackground } from '../../../../libs/front/pages/root/src/lib/components/SvgBackground';
import { HighlightedPosts } from './components/HighlightedPosts';
import { SeeMoreText } from './components/StyledText';
import { PostsHelper } from './utils/PostsHelper';
import { Post } from '../../.contentlayer/generated';
import { PostCard } from './components/PostCard';
import { AllOthersPosts } from './components/AllOthersPosts';

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <Box>
          <SvgBackground />
          <HighlightedPosts />
          <Divider sx={{ my: 10 }} />
          <AllOthersPosts />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
