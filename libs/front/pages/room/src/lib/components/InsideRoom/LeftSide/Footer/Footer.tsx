import { Box, Button } from '@cypher/front/shared/ui';
import { Controls } from './Controls/Controls';

interface FooterProps {
  controls: {
    mic: {
      disabled: boolean;
      value: boolean;
      onToggle: () => void;
    };
    mediaDeviceSelect: {
      disabled: boolean;
    };
  };
  mainButton: {
    label: string;
    onClick: () => Promise<void>;
    loading: boolean;
  };
}

export function InsideRoomLeftSideFooter({
  mainButton,
  controls,
}: FooterProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          minWidth: '150px',
          width: '150px',
          maxWidth: '150px',
        }}
      >
        <Controls {...controls} />
      </Box>
      <Button
        size="lg"
        onClick={mainButton.onClick}
        loading={mainButton.loading}
        fullWidth
      >
        {mainButton.label}
      </Button>
    </Box>
  );
}
