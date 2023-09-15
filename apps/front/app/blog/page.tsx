import { Footer, Header } from '@cypher/front/components/common';
import React from 'react';
import { Box, Container, Stack } from '@cypher/front/shared/ui';
import { LeftSide } from './components/LeftSide';
import { RightSide } from './components/RightSide';
import { SvgBackground } from '../../../../libs/front/pages/root/src/lib/components/SvgBackground';
export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <Box>
          <SvgBackground />
          <Stack direction="row" spacing={4} sx={{ mt: 10, minHeight: '80vh' }}>
            <LeftSide />
            <RightSide />
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
