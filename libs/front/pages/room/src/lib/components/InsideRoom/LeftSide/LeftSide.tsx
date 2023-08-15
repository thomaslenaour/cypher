import { Mic, MicOff } from 'lucide-react';

import { Box, Button, Typography } from '@cypher/front/shared/ui';

import { MediaDeviceSelect } from './MediaDeviceSelect';

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
        p: 1,
        height: '100%',
        width: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography level="h5" fontWeight={700}>
          Prochains beats
        </Typography>
        <Box>
          <Typography level="body2">Beat 1</Typography>
          <Typography level="body2">Beat 2</Typography>
          <Typography level="body2">Beat 3</Typography>
          <Typography level="body2">Beat 4</Typography>
        </Box>
      </Box>
      <Box>
        <MediaDeviceSelect />
        <Button
          startDecorator={microphoneEnabled ? <Mic /> : <MicOff />}
          onClick={onMicrophoneClick}
          color={microphoneEnabled ? 'primary' : 'danger'}
          fullWidth
        >
          Mic. {microphoneEnabled ? 'ON' : 'OFF'}
        </Button>
      </Box>
    </Box>
  );
}
