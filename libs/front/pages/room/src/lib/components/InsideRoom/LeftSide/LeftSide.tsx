'use client';

import { Box } from '@cypher/front/shared/ui';
import { InsideRoomLeftSideFooter } from './Footer/Footer';
import { InsideRoomLeftSideHeader } from './Header/Header';
import { InsideRoomLeftSideMain } from './Main/Main';
import { ConnectionQuality } from 'livekit-client';

interface InsideRoomLeftSideProps {
  header: {
    participants: number;
    waitingArtists?: string[];
    nextArtist?: string;
  };
  main: {
    status: {
      text: string;
      isCurrentlyPublishing: boolean;
      pseudo: string | null;
    };
    timer: {
      enabled: boolean;
      timeRemaining: number;
    };
  };
  footer: {
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
    mainButton: {
      label: string;
      onClick: () => Promise<void>;
      loading: boolean;
    };
    position?: number;
    chat: {
      toggle: () => void;
      open: boolean;
    };
  };
}

export function InsideRoomLeftSide({
  header,
  main,
  footer,
}: InsideRoomLeftSideProps) {
  return (
    <Box
      sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column' }}
    >
      <InsideRoomLeftSideHeader {...header} />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <InsideRoomLeftSideMain {...main} />
      </Box>
      <InsideRoomLeftSideFooter {...footer} />
    </Box>
  );
}
