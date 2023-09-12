'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  RoomAudioRenderer,
  useDataChannel,
  useLocalParticipant,
  useParticipants,
  useRoomContext,
} from '@livekit/components-react';

import { Box } from '@cypher/front/shared/ui';

import { InsideRoomLeftSide } from './LeftSide/LeftSide';
import { InsideRoomRightSide } from './RightSide/RightSide';
import { InsideRoomMiddleArea } from './MiddleArea/MiddleArea';

import { ReadyToGo } from './ReadyToGo';
import { useMutation } from '@cypher/front/libs/apollo';
import { StartPublishingDocument } from '@cypher/front/shared/graphql';
import { DataPacket_Kind } from 'livekit-client';
import { JingleStreaming } from './JingleStreaming';
import { BeatStreaming } from './BeatStreaming';

const BEAT_DURATION_IN_SECONDS = 183;

enum JingleStatus {
  Play = 'Play',
  Stop = 'Stop',
}

interface InsideRoomProps {
  roomId: string;
  authenticated: boolean;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function InsideRoom({ roomId, authenticated }: InsideRoomProps) {
  const beatElRef = useRef<HTMLAudioElement | null>(null);
  const jingleElRef = useRef<HTMLAudioElement | null>(null);
  const [readyToGo, setReadyToGo] = useState(false);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
  const [micPermissionEnabled, setMicPermissionEnabled] = useState(false);
  const [jingleStatus, setJingleStatus] = useState<JingleStatus>(
    JingleStatus.Stop
  );

  const currentRoom = useRoomContext();
  const participants = useParticipants();
  const currentParticipant = useLocalParticipant();
  const { send, message } = useDataChannel();

  const currentPublisher = useMemo(() => {
    const publisher = participants.find((participant) => {
      if (participant?.metadata) {
        const parsedMetadata = JSON.parse(participant.metadata);
        return parsedMetadata?.canPublishAt;
      }
      return false;
    });

    return publisher;
  }, [participants]);

  const currentPublisherMetadata = currentPublisher?.metadata
    ? JSON.parse(currentPublisher.metadata)
    : {};
  const iAmThePublisher =
    currentParticipant?.localParticipant?.identity ===
    currentPublisher?.identity;
  const roomCreatedAt = currentRoom?.metadata
    ? JSON.parse(currentRoom?.metadata)?.createdAt
    : null;
  const beatMuted = !!currentPublisherMetadata?.startPublishAt;

  const [startPublishing] = useMutation(StartPublishingDocument);

  const handleStartPublishingClick = async () => {
    if (!iAmThePublisher || !currentRoom) return;

    try {
      const response = await startPublishing({
        variables: {
          data: {
            identity: currentParticipant.localParticipant?.identity,
            roomId,
          },
        },
      });

      if (response.data?.startPublishing) {
        send(encoder.encode(JingleStatus.Play), {
          kind: DataPacket_Kind.LOSSY,
        });
        currentRoom.localParticipant.setMicrophoneEnabled(true);
        // publish the beat
        setMicPermissionEnabled(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMicrophone = useCallback(() => {
    if (currentRoom) {
      currentRoom.localParticipant.setMicrophoneEnabled(!microphoneEnabled);
      setMicrophoneEnabled((prev) => !prev);
    }
  }, [currentRoom, microphoneEnabled]);

  const askForMicPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      setMicPermissionEnabled(true);
    } catch (err) {
      setMicPermissionEnabled(false);
    }
  };

  const handleReady = () => {
    setReadyToGo(true);

    if (beatElRef.current) {
      const now = new Date().getTime();
      const beatPosition =
        ((now - roomCreatedAt) / 1000) % BEAT_DURATION_IN_SECONDS;
      beatElRef.current.currentTime = Number(beatPosition) || 0;
      beatElRef.current.play().catch((err) => {
        console.error(err);
      });
    }
  };

  useEffect(() => {
    askForMicPermission();
  }, []);

  useEffect(() => {
    const status = message?.payload
      ? (decoder.decode(message?.payload) as JingleStatus)
      : JingleStatus.Stop;

    setJingleStatus(status);
  }, [message]);

  useEffect(() => {
    if (jingleElRef.current) {
      if (jingleStatus === JingleStatus.Play) {
        jingleElRef.current.play();
        setJingleStatus(JingleStatus.Stop);
      }
    }
  }, [jingleStatus]);

  return (
    <>
      {!readyToGo && (
        <ReadyToGo
          onReady={handleReady}
          micPermissionEnabled={micPermissionEnabled}
        />
      )}
      <BeatStreaming
        ref={beatElRef}
        beatMuted={iAmThePublisher ? false : beatMuted}
      />
      <JingleStreaming ref={jingleElRef} />
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
              onStartPublishingClick={handleStartPublishingClick}
              currentPublisher={currentPublisher}
              authenticated={authenticated}
              micPermissionEnabled={micPermissionEnabled}
              participants={participants}
            />
          </Box>
          <InsideRoomRightSide />
        </Box>
        <RoomAudioRenderer />
      </Box>
    </>
  );
}
