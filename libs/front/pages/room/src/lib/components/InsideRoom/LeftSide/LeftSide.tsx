'use client';

import { Box } from '@cypher/front/shared/ui';
import { InsideRoomLeftSideFooter } from './Footer/Footer';
import { InsideRoomLeftSideHeader } from './Header/Header';
import { InsideRoomLeftSideMain } from './Main/Main';

interface InsideRoomLeftSideProps {
  header: {
    participants: number;
    waitingArtists: number;
    nextArtist?: string;
  };
  main: {
    status: { text: string };
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
