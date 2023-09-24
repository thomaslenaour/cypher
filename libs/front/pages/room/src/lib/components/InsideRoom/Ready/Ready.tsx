'use client';

import { RecordingAnimation } from '@cypher/front/components/common';
import {
  Button,
  Box,
  Typography,
  Chip,
  Stack,
  Container,
} from '@cypher/front/shared/ui';
import { Info } from 'lucide-react';

interface ReadyProps {
  onReady: () => void;
}

export function Ready({ onReady }: ReadyProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: {
          xs: 0,
          md: '-100px',
        },
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          padding: '0 !important',
          margin: '0 !important',
        }}
      >
        <Box
          sx={{
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'neutral.700' : 'neutral.200',
            p: 2,
          }}
        >
          <RecordingAnimation />
          <Typography level="h2" textAlign="center">
            Prêt à rejoindre le Cypher ?
          </Typography>
          <Stack direction="column" alignItems="center" my={4} spacing={2}>
            <Chip
              variant="soft"
              startDecorator={<Info size="18px" />}
              sx={{ width: '100%' }}
            >
              Pour pouvoir rapper, vous devez être connecter à votre compte
            </Chip>
            <Chip
              variant="soft"
              startDecorator={<Info size="18px" />}
              sx={{ width: '100%' }}
            >
              Les participants peuvent vous entendre uniquement lorsque vous
              rappez
            </Chip>
            <Chip
              variant="soft"
              startDecorator={<Info size="18px" />}
              sx={{ width: '100%' }}
            >
              Respectez les autres utilisateurs
            </Chip>
          </Stack>
          <Button size="lg" fullWidth sx={{ mt: 2 }} onClick={onReady}>
            Rejoindre le Cypher
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
