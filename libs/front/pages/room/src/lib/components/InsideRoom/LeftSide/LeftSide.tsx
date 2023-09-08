import { Box } from '@cypher/front/shared/ui';

import { Beats } from './Beats/Beats';
import { Parameters } from './Parameters/Parameters';

interface InsideRoomLeftSideProps {
  microphoneEnabled: boolean;
  onMicrophoneClick: () => void;
  parametersDisabled: boolean;
}

export function InsideRoomLeftSide({
  microphoneEnabled,
  onMicrophoneClick,
  parametersDisabled,
}: InsideRoomLeftSideProps) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ height: '50%' }}>
        <Beats />
      </Box>
      <Box sx={{ height: '50%' }}>
        <Parameters
          disabled={parametersDisabled}
          microphoneEnabled={microphoneEnabled}
          onMicrophoneClick={onMicrophoneClick}
        />
      </Box>
    </Box>
  );
}
