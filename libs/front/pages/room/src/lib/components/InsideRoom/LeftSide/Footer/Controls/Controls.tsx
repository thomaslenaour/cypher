import { Box } from '@cypher/front/shared/ui';
import { MediaDeviceSelect } from './MediaDeviceSelect/MediaDeviceSelect';
import { MicToggle } from './MicToggle/MicToggle';

interface ControlsProps {
  mic: {
    disabled: boolean;
    value: boolean;
    onToggle: () => void;
  };
  mediaDeviceSelect: {
    disabled: boolean;
  };
}

export function Controls({ mic, mediaDeviceSelect }: ControlsProps) {
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
    </Box>
  );
}
