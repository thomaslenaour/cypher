import { Mic, MicOff } from 'lucide-react';

import { Box, Button, Typography } from '@cypher/front/shared/ui';

interface InsideRoomLeftSideProps {
  microphoneEnabled: boolean;
  onMicrophoneClick: () => void;
}

export function InsideRoomLeftSide({
  microphoneEnabled,
  onMicrophoneClick,
}: InsideRoomLeftSideProps) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box p={2}>
        <Typography level="h4" fontWeight={700}>
          Instrus
        </Typography>
        <ul>
          <li>xxxx</li>
          <li>xxxx</li>
          <li>xxxx</li>
          <li>xxxx</li>
        </ul>
      </Box>
      <Box>
        <Button
          startDecorator={microphoneEnabled ? <MicOff /> : <Mic />}
          onClick={onMicrophoneClick}
          fullWidth
        >
          {microphoneEnabled ? 'Désactiver' : 'Activer'}
        </Button>
      </Box>
    </Box>
  );
}
