import { Box, Button, Typography } from '@cypher/front/shared/ui';
import { MediaDeviceSelect } from './MediaDeviceSelect';
import { Mic, MicOff } from 'lucide-react';

interface ParametersProps {
  microphoneEnabled: boolean;
  onMicrophoneClick: () => void;
  disabled: boolean;
}

export function Parameters({
  microphoneEnabled,
  onMicrophoneClick,
  disabled,
}: ParametersProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        level="title-lg"
        fontWeight={700}
        sx={{
          borderBottom: '1px #EAEEF6 solid',
          borderTop: '1px #EAEEF6 solid',
          p: 1,
        }}
      >
        Paramètres
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <MediaDeviceSelect disabled={disabled} />
        <Button
          size="sm"
          startDecorator={microphoneEnabled ? <Mic /> : <MicOff />}
          onClick={onMicrophoneClick}
          color={microphoneEnabled ? 'success' : 'danger'}
          sx={{
            borderBottomLeftRadius: '16px',
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
          disabled={disabled}
          fullWidth
        >
          Mic. {microphoneEnabled ? 'ON' : 'OFF'}
        </Button>
      </Box>
    </Box>
  );
}
