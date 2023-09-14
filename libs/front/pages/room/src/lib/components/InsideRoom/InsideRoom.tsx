'use client';

import { Box } from '@cypher/front/shared/ui';
import { useMutation } from '@cypher/front/libs/apollo';
import { InsideRoomRightSide } from './RightSide/RightSide';
import { InsideRoomLeftSide } from './LeftSide/LeftSide';
import {
  AudioTrack,
  useLocalParticipant,
  useLocalParticipantPermissions,
  useParticipants,
  useRoomContext,
  useTracks,
} from '@livekit/components-react';

import { getCurrentPublisher, getParticipantsInQueue } from './utils/room';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Ready } from './Ready/Ready';
import { useRouter } from 'next/navigation';
import {
  StartPublishingDocument,
  ToggleMyselfFromQueueDocument,
} from '@cypher/front/shared/graphql';
import { useWebAudioContext } from '../../context/web-audio';
import {
  LocalParticipant,
  Participant,
  RemoteTrackPublication,
  Track,
} from 'livekit-client';

interface InsideRoomProps {
  roomId: string;
  authenticated: boolean;
}

const BEAT_DURATION_IN_SECONDS = 183;

function isLocal(p: Participant) {
  return p instanceof LocalParticipant;
}

export function InsideRoom({ authenticated, roomId }: InsideRoomProps) {
  // Audio
  const audioContext = useWebAudioContext();
  const audioElContainer = useRef<HTMLDivElement | null>(null);
  const audioEl = useRef<HTMLAudioElement | null>(null);
  const source = useRef<MediaElementAudioSourceNode | null>(null);
  const sink = useRef<MediaStreamAudioDestinationNode | null>(null);

  // React
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [micPermissionError, setMicPermissionError] = useState('');
  const [micOpen, setMicOpen] = useState(false);
  const [footerMainButtonLoading, setFooterMainButtonLoading] = useState(false);

  // Livekit
  const room = useRoomContext();
  const participants = useParticipants();
  const currentParticipant = useLocalParticipant();
  const currentParticipantPermissions = useLocalParticipantPermissions();
  const tracks = useTracks([Track.Source.Microphone, Track.Source.Unknown], {
    updateOnlyOn: [],
    onlySubscribed: false,
  }).filter((ref) => !isLocal(ref.participant));

  // Processing
  const roomCreatedAt = room?.metadata
    ? JSON.parse(room?.metadata)?.createdAt
    : null;
  const participantsInQueue = getParticipantsInQueue(participants);
  const currentPublisher = getCurrentPublisher(participants);
  const currentPublisherMetadata = currentPublisher?.metadata
    ? JSON.parse(currentPublisher.metadata)
    : {};
  const iAmInTheQueue = !!participantsInQueue?.find(
    (p) => p.identity === currentParticipant.localParticipant.identity
  );
  const iAmThePublisher =
    currentParticipant.localParticipant?.identity ===
    currentPublisher?.identity;
  const isCurrentlyPublishing = !!currentPublisherMetadata?.startPublishAt;
  const footerMainButtonLabel = useMemo(() => {
    if (!authenticated) return 'Connecte-toi pour prendre le micro';
    if (iAmThePublisher) {
      if (isCurrentlyPublishing) return 'Terminer mon couplet';
      return `C'est ton moment ! Appuie ici et commence à rapper`;
    }
    if (!iAmInTheQueue) return "Appuie ici pour rejoindre la file d'attente";
    return "Appuie ici pour quitter la file d'attente";
  }, [authenticated, iAmInTheQueue, iAmThePublisher, isCurrentlyPublishing]);

  // GraphQL Requests
  const [toggleMyselfFromQueue] = useMutation(ToggleMyselfFromQueueDocument);
  const [startPublishing] = useMutation(StartPublishingDocument);

  // Handlers
  async function handleReady() {
    if (!audioElContainer.current) return;

    const now = new Date().getTime();
    const beatPosition =
      ((now - roomCreatedAt) / 1000) % BEAT_DURATION_IN_SECONDS;

    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

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

    setReady(true);
  }

  async function handleMainButtonClick() {
    if (!authenticated) {
      router.push('/login');
      return;
    }

    const variables = {
      data: {
        identity: currentParticipant.localParticipant.identity,
        roomId,
      },
    };

    setFooterMainButtonLoading(true);
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
    } catch (err) {
      setMicPermissionError(
        "Tu dois autoriser l'accès à ton micro pour pouvoir rapper"
      );
      setFooterMainButtonLoading(false);
      return;
    }

    try {
      if (iAmThePublisher) {
        if (isCurrentlyPublishing) {
          // unpublish
          console.log('unpublish');
        } else {
          await startPublishing({
            variables,
          });

          if (sink.current) {
            room.localParticipant.setMicrophoneEnabled(micOpen);
            room.localParticipant.publishTrack(
              sink.current.stream.getAudioTracks()[0],
              {
                name: 'beat',
                source: Track.Source.Unknown,
              }
            );
          }
        }
      } else {
        await toggleMyselfFromQueue({
          variables,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFooterMainButtonLoading(false);
    }
  }

  function toggleMicrophone() {
    if (currentParticipantPermissions?.canPublish) {
      room.localParticipant.setMicrophoneEnabled(!micOpen);
    }
    setMicOpen((prev) => !prev);
  }

  // Effects
  useEffect(() => {
    tracks.forEach((track) =>
      (track.publication as RemoteTrackPublication).setSubscribed(true)
    );
  }, [tracks]);

  useEffect(() => {
    if (audioEl.current) {
      if (!iAmThePublisher && isCurrentlyPublishing) {
        audioEl.current.muted = true;
      } else {
        audioEl.current.muted = false;
      }
    }
  }, [isCurrentlyPublishing, iAmThePublisher]);

  return (
    <>
      {!ready && <Ready onReady={handleReady} />}
      <div ref={audioElContainer} />
      {tracks.map((trackRef) => (
        <AudioTrack key={trackRef.publication.trackSid} {...trackRef} />
      ))}
      <Box
        sx={{
          display: ready ? 'flex' : 'none',
          height: '100%',
          border: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'neutral.700' : 'neutral.200',
        }}
      >
        <Box
          sx={{
            flex: 1,
            height: '100%',
            borderRight: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'neutral.700' : 'neutral.200',
          }}
        >
          <InsideRoomLeftSide
            header={{
              participants: participants.length,
              waitingArtists: participantsInQueue.length,
              nextArtist: participantsInQueue?.[0]?.name,
            }}
            footer={{
              controls: {
                mic: {
                  disabled: false,
                  value: micOpen,
                  onToggle: toggleMicrophone,
                },
                mediaDeviceSelect: {
                  disabled: !!micPermissionError,
                },
              },
              mainButton: {
                label: micPermissionError || footerMainButtonLabel,
                onClick: handleMainButtonClick,
                loading: footerMainButtonLoading,
              },
            }}
          />
        </Box>
        <Box sx={{ width: '300px', height: '100%' }}>
          <InsideRoomRightSide authenticated={authenticated} />
        </Box>
      </Box>
    </>
  );
}
