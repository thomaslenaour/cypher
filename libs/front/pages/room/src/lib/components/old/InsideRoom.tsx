'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AudioTrack,
  useLocalParticipant,
  useParticipants,
  useRoomContext,
  useTracks,
} from '@livekit/components-react';
import {
  LocalParticipant,
  Participant,
  RemoteTrackPublication,
  Track,
} from 'livekit-client';

import { Box } from '@cypher/front/shared/ui';
import { useMutation } from '@cypher/front/libs/apollo';
import { StartPublishingDocument } from '@cypher/front/shared/graphql';

import { InsideRoomLeftSide } from './LeftSide/LeftSide';
import { InsideRoomRightSide } from './RightSide/RightSide';
import { InsideRoomMiddleArea } from './MiddleArea/MiddleArea';

import { ReadyToGo } from '../InsideRoom/Ready/Ready';

import { useWebAudioContext } from '../../context/web-audio';

const BEAT_DURATION_IN_SECONDS = 183;

enum JingleStatus {
  Play = 'Play',
  Stop = 'Stop',
}

interface InsideRoomProps {
  roomId: string;
  authenticated: boolean;
}

// const encoder = new TextEncoder();
// const decoder = new TextDecoder();

function isLocal(p: Participant) {
  return p instanceof LocalParticipant;
}

export function InsideRoom({ roomId, authenticated }: InsideRoomProps) {
  const audioContext = useWebAudioContext();
  const audioElContainer = useRef<HTMLDivElement | null>(null);
  const audioEl = useRef<HTMLAudioElement | null>(null);
  const source = useRef<MediaElementAudioSourceNode | null>(null);
  const sink = useRef<MediaStreamAudioDestinationNode | null>(null);

  // const jingleElRef = useRef<HTMLAudioElement | null>(null);
  const [readyToGo, setReadyToGo] = useState(false);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
  const [micPermissionEnabled, setMicPermissionEnabled] = useState(false);
  // const [jingleStatus, setJingleStatus] = useState<JingleStatus>(
  //   JingleStatus.Stop
  // );

  const currentRoom = useRoomContext();
  const participants = useParticipants();
  const currentParticipant = useLocalParticipant();
  const tracks = useTracks([Track.Source.Microphone, Track.Source.Unknown], {
    updateOnlyOn: [],
    onlySubscribed: false,
  }).filter((ref) => !isLocal(ref.participant));
  // const { send, message } = useDataChannel();

  console.log('tracks', tracks);

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
  const beatShouldBeMuted = !!currentPublisherMetadata?.startPublishAt;

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

      if (response.data?.startPublishing && audioElContainer.current) {
        // send(encoder.encode(JingleStatus.Play), {
        //   kind: DataPacket_Kind.LOSSY,
        // });
        currentRoom.localParticipant.setMicrophoneEnabled(true);
        if (sink.current) {
          currentRoom.localParticipant.publishTrack(
            sink.current.stream.getAudioTracks()[0],
            {
              name: 'beat',
              source: Track.Source.Unknown,
            }
          );
        }
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

  const handleReady = async () => {
    if (!audioElContainer.current) return;

    const now = new Date().getTime();
    const beatPosition =
      ((now - roomCreatedAt) / 1000) % BEAT_DURATION_IN_SECONDS;

    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    console.log('audioContext', audioContext);

    audioEl.current = new Audio('/audios/beat.mp3');
    audioEl.current.currentTime = Number(beatPosition) || 0;
    audioEl.current.setAttribute('muted', 'false');
    audioEl.current.setAttribute('loop', 'true');
    audioEl.current.setAttribute('autoplay', 'true');
    audioEl.current.setAttribute('controls', 'true');
    audioElContainer.current.appendChild(audioEl.current);
    source.current = audioContext.createMediaElementSource(audioEl.current);
    sink.current = audioContext.createMediaStreamDestination();
    source.current.connect(audioContext.destination);
    source.current.connect(sink.current);

    setReadyToGo(true);
  };

  useEffect(() => {
    askForMicPermission();
  }, []);

  useEffect(() => {
    tracks.forEach((track) =>
      (track.publication as RemoteTrackPublication).setSubscribed(true)
    );
  }, [tracks]);

  useEffect(() => {
    if (audioEl.current) {
      if (!iAmThePublisher && beatShouldBeMuted) {
        audioEl.current.muted = true;
      } else {
        audioEl.current.muted = false;
      }
    }
  }, [beatShouldBeMuted, iAmThePublisher]);

  // useEffect(() => {
  //   const status = message?.payload
  //     ? (decoder.decode(message?.payload) as JingleStatus)
  //     : JingleStatus.Stop;

  //   setJingleStatus(status);
  // }, [message]);

  // useEffect(() => {
  //   if (jingleElRef.current) {
  //     if (jingleStatus === JingleStatus.Play) {
  //       jingleElRef.current.play();
  //       setJingleStatus(JingleStatus.Stop);
  //     }
  //   }
  // }, [jingleStatus]);

  return (
    <>
      {!readyToGo && (
        <ReadyToGo
          onReady={handleReady}
          micPermissionEnabled={micPermissionEnabled}
        />
      )}
      <div ref={audioElContainer} />
      {/* <JingleStreaming ref={jingleElRef} /> */}
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
        {tracks.map((trackRef) => (
          <AudioTrack key={trackRef.publication.trackSid} {...trackRef} />
        ))}
      </Box>
    </>
  );
}
