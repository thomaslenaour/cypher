'use client';

import { Box } from '@cypher/front/shared/ui';
import { InsideRoomLeftSideFooter } from './Footer/Footer';
import { InsideRoomLeftSideHeader } from './Header/Header';

interface InsideRoomLeftSideProps {
  header: {
    participants: number;
    waitingArtists: number;
    nextArtist?: string;
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
  };
}

export function InsideRoomLeftSide({
  header,
  footer,
}: InsideRoomLeftSideProps) {
  return (
    <Box
      sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column' }}
    >
      <InsideRoomLeftSideHeader
        participants={header.participants}
        waitingArtists={header.waitingArtists}
        nextArtist={header.nextArtist}
      />
      <Box sx={{ flex: 1 }}>
        <Main />
      </Box>
      <InsideRoomLeftSideFooter
        mainButton={footer.mainButton}
        controls={footer.controls}
      />
    </Box>
  );
}

function Main() {
  return <Box />;
}
