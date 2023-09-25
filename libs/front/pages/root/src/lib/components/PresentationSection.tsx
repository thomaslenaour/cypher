'use client';

import {
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
} from '@cypher/front/shared/ui';
import { CircleDashed, RadioTower, Shell } from 'lucide-react';

interface PresentationCardProps {
  title: string;
  logo: React.ReactNode;
  description: string;
}

function PresentationCard({ title, logo, description }: PresentationCardProps) {
  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'neutral.700' : 'neutral.200',
        borderRadius: '1px',
        width: '100%',
        p: 2,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        {logo}
        <Typography level="h4">{title}</Typography>
      </Stack>
      <Typography mt={1}>{description}</Typography>
    </Box>
  );
}

export function PresentationSection() {
  const theme = useTheme();

  return (
    <Container>
      <Typography
        sx={{
          typography: {
            xs: 'h2',
            md: 'h1',
          },
          textAlign: 'center',
          mb: { xs: 5, md: 10 },
        }}
        id="what-is-cypher"
      >
        Qu'est-ce que Cypher ?
      </Typography>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
      >
        <PresentationCard
          title="Cypher en direct"
          logo={<RadioTower size={48} color={theme.palette.primary[500]} />}
          description="Explore des cyphers en direct et rejoins des rappeurs du monde entier. Affiche tes compétences et connecte-toi avec d'autres passionnés de rap instantanément."
        />
        <PresentationCard
          title="Partage ton flow"
          logo={<CircleDashed size={48} color={theme.palette.primary[500]} />}
          description="Rejoins une communauté de rappeurs en ligne et partage ton flow avec le monde entier. Fais-toi entendre, reçois des commentaires constructifs et connecte-toi avec d'autres artistes partageant la même passion."
        />
        <PresentationCard
          title="Respect et découverte"
          logo={<Shell size={48} color={theme.palette.primary[500]} />}
          description="Le rap en ligne est un art où règnent le respect et la découverte. Ecoute les talents émergents, encourage les nouveaux artistes et découvre des voix uniques."
        />
      </Stack>
    </Container>
  );
}
