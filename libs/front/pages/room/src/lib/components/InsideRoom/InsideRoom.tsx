'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRoomContext } from '@livekit/components-react';

import { Box } from '@cypher/front/shared/ui';

import { InsideRoomLeftSide } from './LeftSide/LeftSide';
import { InsideRoomRightSide } from './RightSide/RightSide';
import { InsideRoomMiddleArea } from './MiddleArea/MiddleArea';

interface InsideRoomProps {
  roomId: string;
  authenticated: boolean;
}

export function InsideRoom({ roomId, authenticated }: InsideRoomProps) {
  const currentRoom = useRoomContext();
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
  const [micPermissionEnabled, setMicPermissionEnabled] = useState(false);

  const handleMicrophoneOpen = useCallback(() => {
    if (currentRoom) {
      currentRoom.localParticipant.setMicrophoneEnabled(true);
    }
    setMicrophoneEnabled(true);
  }, [currentRoom]);

  const toggleMicrophone = useCallback(() => {
    if (currentRoom) {
      currentRoom.localParticipant.setMicrophoneEnabled(!microphoneEnabled);
    }
    setMicrophoneEnabled((prev) => !prev);
  }, [currentRoom, microphoneEnabled]);

  const askForMicPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      setMicPermissionEnabled(true);
    } catch (err) {
      setMicPermissionEnabled(false);
    }
  };

  useEffect(() => {
    askForMicPermission();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'common.white',
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'neutral.100',
        height: '600px',
      }}
    >
      <InsideRoomLeftSide
        microphoneEnabled={microphoneEnabled}
        onMicrophoneClick={toggleMicrophone}
        parametersDisabled={!micPermissionEnabled}
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
          authenticated={authenticated}
          micPermissionEnabled={micPermissionEnabled}
        />
      </Box>
      <InsideRoomRightSide />
    </Box>
  );
}
