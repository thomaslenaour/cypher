'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  RoomAudioRenderer,
  useDataChannel,
  useRoomContext,
} from '@livekit/components-react';

import { Box } from '@cypher/front/shared/ui';

import { InsideRoomLeftSide } from './LeftSide/LeftSide';
import { InsideRoomRightSide } from './RightSide/RightSide';
import { InsideRoomMiddleArea } from './MiddleArea/MiddleArea';
import { BeatStreaming } from './BeatStreaming';
import { ReadyToGo } from './ReadyToGo';
import { DataPacket_Kind } from 'livekit-client';

interface InsideRoomProps {
  roomId: string;
  authenticated: boolean;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function InsideRoom({ roomId, authenticated }: InsideRoomProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [readyToGo, setReadyToGo] = useState(false);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
  const [micPermissionEnabled, setMicPermissionEnabled] = useState(false);

  const currentRoom = useRoomContext();
  const { message, send } = useDataChannel();

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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', () => {
        const position = audioRef.current?.currentTime;

        if (position) {
          send(encoder.encode(position.toString()), {
            kind: DataPacket_Kind.LOSSY,
          });
        }
      });
    }
  }, [send]);

  const handleReady = () => {
    setReadyToGo(true);

    if (audioRef.current) {
      const beatPosition = decoder.decode(message?.payload);
      audioRef.current.currentTime = Number(beatPosition) || 0;
      audioRef.current.play();
    }
  };

  return (
    <>
      {!readyToGo && (
        <ReadyToGo
          onReady={handleReady}
          micPermissionEnabled={micPermissionEnabled}
        />
      )}
      <BeatStreaming ref={audioRef} />
      <Box sx={{ display: readyToGo ? 'block' : 'none' }}>
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
        <RoomAudioRenderer />
      </Box>
    </>
  );
}
