import { Header } from '@cypher/front/components/common';
import { getClient } from '@cypher/front/libs/apollo/server';
import { GetRoomsDocument } from '@cypher/front/shared/graphql';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@cypher/front/shared/ui';
import { Footer } from '@cypher/front/components/common';
import { RecordingAnimation } from './components/RecordingAnimation';
import { PresentationSection } from './components/PresentationSection';
import { SvgBackground } from './components/SvgBackground';
import { ChevronsDown } from 'lucide-react';

export async function HomePage() {
  const response = await getClient().query({
    query: GetRoomsDocument,
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <ChevronsDown size={24} />
        </Box>
        <SvgBackground />
        <Container>
          <Stack direction="column" alignItems="center">
            <RecordingAnimation />
            <Stack
              direction="column"
              alignItems="center"
              spacing={{ xs: 3, md: 5 }}
              mt={{ xs: 5, md: 10 }}
              mb={{ xs: 7.5, md: 15 }}
            >
              <Typography
                level="h1"
                sx={{
                  fontSize: {
                    xs: '2.5rem',
                    md: '4rem',
                  },
                  lineHeight: {
                    xs: '2.5rem',
                    md: '4rem',
                  },
                }}
                textAlign="center"
              >
                <Typography sx={{ color: 'primary.500' }}>
                  Élevez votre art
                </Typography>
                , participez à un{' '}
                <Typography sx={{ color: 'primary.500' }}>cypher</Typography> en
                ligne et vivez{' '}
                <Typography sx={{ color: 'primary.500' }}>
                  l'expérience ultime
                </Typography>{' '}
                du freestyle
              </Typography>
              <Typography
                level="title-lg"
                sx={{ fontWeight: '500' }}
                color="neutral"
                maxWidth="md"
                textAlign="center"
              >
                Rappez en ligne, repoussez vos limites artistiques, et tracez
                votre chemin pour devenir une légende du freestyle.
              </Typography>
            </Stack>
            <Button size="lg" fullWidth sx={{ maxWidth: { md: '500px' } }}>
              Prêt à briller ? Rejoignez le Cypher maintenant !
            </Button>
          </Stack>
        </Container>
      </Box>
      <Box sx={{ height: 'calc(100vh - 73px)' }} />
      <PresentationSection />
      <Footer />
    </>
  );
}

export default HomePage;
