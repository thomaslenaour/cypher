'use client';

import { RecordingAnimation } from '@cypher/front/components/common';
import { Button, Box, Typography, Chip, Stack } from '@cypher/front/shared/ui';
import { Info } from 'lucide-react';

interface ReadyProps {
  onReady: () => void;
  // micPermissionStatus?: 'granted' | 'denied' | 'prompt';
}

export function Ready({ onReady }: ReadyProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '-100px',
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
      <Box
        width="600px"
        sx={{
          border: '1px red solid',
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
          <Chip variant="soft" startDecorator={<Info />}>
            Pour pouvoir rapper, vous devez être connecter à votre compte
          </Chip>
          <Chip variant="soft" startDecorator={<Info />}>
            Les participants peuvent vous entendre uniquement lorsque vous
            rappez
          </Chip>
          <Chip variant="soft" startDecorator={<Info />}>
            Respectez les autres utilisateurs
          </Chip>
          {/* <Chip
            variant="soft"
            color={micPermissionEnabled ? 'success' : 'primary'}
            startDecorator={micPermissionEnabled ? <Check /> : <X />}
          >
            Statut du micro : {micPermissionEnabled ? 'autorisé' : 'bloqué'}
          </Chip> */}
        </Stack>
        <Button size="lg" fullWidth sx={{ mt: 2 }} onClick={onReady}>
          Rejoindre le Cypher
        </Button>
      </Box>
    </Box>
  );
}
