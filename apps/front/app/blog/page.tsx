import React from 'react';
import { Box, Container, Divider } from '@cypher/front/shared/ui';
import { SvgBackground } from '../../../../libs/front/pages/root/src/lib/components/SvgBackground';
import { HighlightedPosts } from './components/HighlightedPosts';
import { AllOthersPosts } from './components/AllOthersPosts';
import { Footer, Header } from '@cypher/front/components/common/server';

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
