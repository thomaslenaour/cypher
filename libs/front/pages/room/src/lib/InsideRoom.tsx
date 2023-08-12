'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRoomContext } from '@livekit/components-react';

import { Box } from '@cypher/front/shared/ui';

import { InsideRoomLeftSide } from './components/InsideRoom/LeftSide';
import { InsideRoomRightSide } from './components/InsideRoom/RightSide';
import { InsideRoomMiddleArea } from './components/InsideRoom/MiddleArea';

interface InsideRoomProps {
  roomId: string;
}

export function InsideRoom({ roomId }: InsideRoomProps) {
  const currentRoom = useRoomContext();
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);

  const handleMicrophoneOpen = useCallback(() => {
    setMicrophoneEnabled(true);
  }, []);

  useEffect(() => {
    if (currentRoom) {
      currentRoom.localParticipant.setMicrophoneEnabled(microphoneEnabled);
    }
  }, [microphoneEnabled, currentRoom]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'common.white',
        borderRadius: '16px',
        borderColor: 'neutral.100',
        height: '600px',
      }}
    >
      <InsideRoomLeftSide
        microphoneEnabled={microphoneEnabled}
        onMicrophoneClick={() => setMicrophoneEnabled((prev) => !prev)}
      />
      <Box
        sx={{
          flex: 1,
          borderLeft: '1px solid',
          borderRight: '1px solid',
          borderColor: 'neutral.100',
        }}
      >
        <InsideRoomMiddleArea
          roomId={roomId}
          onMicrophoneOpen={handleMicrophoneOpen}
        />
      </Box>
      <InsideRoomRightSide />
    </Box>
  );
}
