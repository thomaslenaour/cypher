import { Box, Button, IconButton, Typography } from '@cypher/front/shared/ui';
import { Controls } from './Controls/Controls';
import { Eye, EyeOff } from 'lucide-react';

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
  chat: {
    toggle: () => void;
    open: boolean;
  };
}

export function InsideRoomLeftSideFooter({
  mainButton,
  controls,
  chat,
}: FooterProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          minWidth: { xs: '100%', md: '150px' },
          width: { xs: '100%', md: '150px' },
          maxWidth: { xs: '100%', md: '150px' },
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
      <IconButton
        variant="outlined"
        onClick={chat.toggle}
        size="sm"
        sx={{
          p: { xs: 1, md: 2 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.5,
        }}
      >
        <Box>{chat.open ? <EyeOff size="20px" /> : <Eye size="20px" />}</Box>{' '}
        <Typography>Chat</Typography>
      </IconButton>
    </Box>
  );
}
