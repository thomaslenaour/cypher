import { Box, Typography, keyframes, styled } from '@cypher/front/shared/ui';
import { MediaDeviceSelect } from './MediaDeviceSelect/MediaDeviceSelect';
import { MicToggle } from './MicToggle/MicToggle';
import { ConnectionQuality } from 'livekit-client';
import { Loader2, Signal, SignalHigh, SignalLow } from 'lucide-react';

interface ControlsProps {
  mic: {
    disabled: boolean;
    value: boolean;
    onToggle: () => void;
  };
  mediaDeviceSelect: {
    disabled: boolean;
  };
  connectionQuality: ConnectionQuality;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatedLoader = styled(Loader2)({
  animation: `${spin} 1s infinite ease`,
});

function getConnectionQualityIcon(quality: ConnectionQuality) {
  switch (quality) {
    case ConnectionQuality.Excellent:
      return <Signal />;
    case ConnectionQuality.Good:
      return <SignalHigh />;
    case ConnectionQuality.Poor:
      return <SignalLow />;
    default:
      return <RotatedLoader />;
  }
}

function getConnectionQualityColor(quality: ConnectionQuality) {
  switch (quality) {
    case ConnectionQuality.Excellent:
      return 'success.500';
    case ConnectionQuality.Good:
      return '#fb923c';
    case ConnectionQuality.Poor:
      return 'primary.400';
    default:
      return 'neutral.400';
  }
}

function getConnectionQualityLabel(quality: ConnectionQuality) {
  switch (quality) {
    case ConnectionQuality.Excellent:
      return 'Excellente';
    case ConnectionQuality.Good:
      return 'Bonne';
    case ConnectionQuality.Poor:
      return 'Faible';
    default:
      return 'Inconnue';
  }
}

export function Controls({
  mic,
  mediaDeviceSelect,
  connectionQuality,
}: ControlsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', md: 'column' },
        gap: 1,
      }}
    >
      <MicToggle {...mic} />
      <MediaDeviceSelect disabled={mediaDeviceSelect.disabled} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          color: getConnectionQualityColor(connectionQuality),
        }}
      >
        {getConnectionQualityIcon(connectionQuality)}
        <Typography
          level="body-sm"
          sx={{ color: getConnectionQualityColor(connectionQuality) }}
        >
          {getConnectionQualityLabel(connectionQuality)}
        </Typography>
      </Box>
    </Box>
  );
}
