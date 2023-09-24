import { Box, Button, IconButton, Typography } from '@cypher/front/shared/ui';
import { Controls } from './Controls/Controls';
import { Eye, EyeOff } from 'lucide-react';
import { ConnectionQuality } from 'livekit-client';

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
    connectionQuality: ConnectionQuality;
  };
  position?: number;
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
  position,
}: FooterProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'flex-end',
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
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          width: '100%',
          gap: 1,
          alignItems: 'flex-end',
        }}
      >
        <Box
          sx={{
            width: '100%',
          }}
        >
          {position && (
            <Typography level="body-sm" textAlign="center" sx={{ mb: 0.5 }}>
              {position === 1
                ? `C'est ton tour ! Tu disposes de 30s pour commencer ton couplet`
                : `Tu es en position {position} dans la file`}
            </Typography>
          )}
          <Button
            size="lg"
            onClick={mainButton.onClick}
            loading={mainButton.loading}
            sx={{
              height: '64px',
            }}
            fullWidth
          >
            {mainButton.label}
          </Button>
        </Box>
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
            height: '64px',
            width: {
              xs: '100%',
              md: 'auto',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {chat.open ? <EyeOff size="20px" /> : <Eye size="20px" />}
          </Box>{' '}
          <Typography>Chat</Typography>
        </IconButton>
      </Box>
    </Box>
  );
}
