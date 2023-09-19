'use client';

import { Box } from '@cypher/front/shared/ui';
import { useMutation } from '@cypher/front/libs/apollo';
import { InsideRoomRightSide } from './RightSide/RightSide';
import { InsideRoomLeftSide } from './LeftSide/LeftSide';
import {
  AudioTrack,
  useConnectionQualityIndicator,
  useDataChannel,
  useLocalParticipant,
  useLocalParticipantPermissions,
  useParticipants,
  useRoomContext,
  useTracks,
} from '@livekit/components-react';

import { getCurrentPublisher, getParticipantsInQueue } from './utils/room';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Ready } from './Ready/Ready';
import { useRouter } from 'next/navigation';
import {
  StartPublishingDocument,
  StopPublishingDocument,
} from '@cypher/front/shared/graphql';
import { useWebAudioContext } from '../../context/web-audio';
import {
  AudioPresets,
  DataPacket_Kind,
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
export const PUBLISH_DURATION_SECONDS = 45;

function isLocal(p: Participant) {
  return p instanceof LocalParticipant;
}

let interval: NodeJS.Timeout | null = null;
let jingleTimeout: NodeJS.Timeout | null = null;

const PLAY_JINGLE_MESSAGE = 'pj';
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function InsideRoom({ authenticated, roomId }: InsideRoomProps) {
  // Audio
  const audioContext = useWebAudioContext();
  const audioElContainer = useRef<HTMLDivElement | null>(null);
  const jingleEl = useRef<HTMLAudioElement | null>(null);
  const audioEl = useRef<HTMLAudioElement | null>(null);
  const source = useRef<MediaElementAudioSourceNode | null>(null);
  const sink = useRef<MediaStreamAudioDestinationNode | null>(null);

  // Timer
  const [remainingSeconds, setRemainingSeconds] = useState(
    PUBLISH_DURATION_SECONDS
  );

  // React
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [micPermissionError, setMicPermissionError] = useState('');
  const [micOpen, setMicOpen] = useState(false);
  const [footerMainButtonLoading, setFooterMainButtonLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [canPublish, setCanPublish] = useState(false);

  // Livekit
  const room = useRoomContext();
  const participants = useParticipants();
  const currentParticipant = useLocalParticipant();
  const currentParticipantPermissions = useLocalParticipantPermissions();
  const { send } = useDataChannel((msg) => {
    const decodedMessage = decoder.decode(msg.payload);
    if (decodedMessage === PLAY_JINGLE_MESSAGE) {
      jingleEl?.current?.play();
    }
  });
  const tracks = useTracks([Track.Source.Microphone, Track.Source.Unknown], {
    updateOnlyOn: [],
    onlySubscribed: false,
  }).filter((ref) => !isLocal(ref.participant));
  const { quality } = useConnectionQualityIndicator({
    participant: currentParticipant.localParticipant,
  });

  // Processing
  const roomCreatedAt = room?.metadata
    ? JSON.parse(room?.metadata)?.createdAt
    : null;
  const participantsInQueue = getParticipantsInQueue(participants);
  const currentPublisher = getCurrentPublisher(participants);
  const currentParticipantMetadata = useMemo(() => {
    if (currentParticipant?.localParticipant?.metadata) {
      return JSON.parse(currentParticipant.localParticipant.metadata);
    }
    return {};
  }, [currentParticipant?.localParticipant?.metadata]);
  const currentPublisherMetadata = useMemo(() => {
    if (currentPublisher?.metadata) {
      return JSON.parse(currentPublisher.metadata);
    }
    return {};
  }, [currentPublisher?.metadata]);
  const iAmInTheQueue = useMemo(() => {
    return !!participantsInQueue?.find(
      (p) => p.identity === currentParticipant.localParticipant.identity
    );
  }, [participantsInQueue, currentParticipant.localParticipant.identity]);
  const iAmThePublisher =
    currentParticipant.localParticipant?.identity ===
    currentPublisher?.identity;
  const myPositionInQueue = useMemo(() => {
    if (!iAmInTheQueue) return undefined;

    const p = participantsInQueue.findIndex(
      (p) => p.identity === currentParticipant.localParticipant.identity
    );

    return p + 1;
  }, [
    currentParticipant.localParticipant.identity,
    iAmInTheQueue,
    participantsInQueue,
  ]);
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
  const statusText = useMemo(() => {
    if (currentPublisher) {
      if (isCurrentlyPublishing)
        return `${currentPublisher.name} est en train de rapper !`;
      else
        return `${currentPublisher.name} a le micro en main, c'est quand tu veux !`;
    } else {
      if (participantsInQueue?.length === 0)
        return "Aucun artiste présent dans la file d'attente...";
      else return "Le micro est en cours d'attribution";
    }
  }, [currentPublisher, participantsInQueue, isCurrentlyPublishing]);

  // GraphQL Requests
  const [startPublishing] = useMutation(StartPublishingDocument);
  const [stopPublishing] = useMutation(StopPublishingDocument);

  // Handlers
  async function toggleChat() {
    setChatOpen((prev) => !prev);
  }

  async function handleReady() {
    if (!audioElContainer.current) return;

    const now = new Date().getTime();
    const beatPosition =
      ((now - roomCreatedAt) / 1000) % BEAT_DURATION_IN_SECONDS;

    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    audioEl.current = new Audio('/audios/beat.mp3');
    jingleEl.current = new Audio('/audios/jingle.mp3');
    audioEl.current.currentTime = Number(beatPosition) || 0;
    audioEl.current.setAttribute(
      'muted',
      isCurrentlyPublishing ? 'true' : 'false'
    );
    audioEl.current.muted = !!isCurrentlyPublishing;
    audioEl.current.setAttribute('loop', 'true');
    audioEl.current.setAttribute('autoplay', 'true');
    audioEl.current.volume = 0.25;
    jingleEl.current.volume = 1;
    audioElContainer.current.appendChild(audioEl.current);
    audioElContainer.current.appendChild(jingleEl.current);
    source.current = audioContext.createMediaElementSource(audioEl.current);
    sink.current = audioContext.createMediaStreamDestination();
    source.current.connect(audioContext.destination);
    source.current.connect(sink.current);

    setReady(true);
  }

  const handleStopPublishing = useCallback(async () => {
    if (iAmThePublisher) {
      if (sink.current) {
        room.localParticipant.setMicrophoneEnabled(false);
        room.localParticipant.unpublishTrack(
          sink.current.stream.getAudioTracks()[0],
          false
        );
      }
      await stopPublishing({
        variables: {
          data: {
            identity: currentParticipant.localParticipant.identity,
            roomId,
          },
        },
      });
      setCanPublish(false);
    }
    if (interval) {
      clearInterval(interval);
      interval = null;
      setRemainingSeconds(PUBLISH_DURATION_SECONDS);
    }
    if (jingleTimeout) {
      clearTimeout(jingleTimeout);
      jingleTimeout = null;
    }
  }, [
    room.localParticipant,
    roomId,
    stopPublishing,
    currentParticipant.localParticipant.identity,
    iAmThePublisher,
  ]);

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
          if (jingleTimeout) {
            clearTimeout(jingleTimeout);
            jingleTimeout = null;
          }
          send(encoder.encode(PLAY_JINGLE_MESSAGE), {
            kind: DataPacket_Kind.LOSSY,
          });
          await handleStopPublishing();
        } else {
          send(encoder.encode(PLAY_JINGLE_MESSAGE), {
            kind: DataPacket_Kind.LOSSY,
          });
          jingleTimeout = setTimeout(() => {
            send(encoder.encode(PLAY_JINGLE_MESSAGE), {
              kind: DataPacket_Kind.LOSSY,
            });
          }, PUBLISH_DURATION_SECONDS * 1000);
          await startPublishing({ variables });
          if (sink.current) {
            room.localParticipant.setMicrophoneEnabled(micOpen);
            room.localParticipant.publishTrack(
              sink.current.stream.getAudioTracks()[0],
              {
                name: 'beat',
                source: Track.Source.Unknown,
                audioPreset: AudioPresets.musicHighQualityStereo,
                dtx: true,
                red: true,
              }
            );
          }
        }
      } else {
        currentParticipant.localParticipant.setMetadata(
          JSON.stringify({
            ...currentParticipantMetadata,
            inQueueAt: currentParticipantMetadata?.inQueueAt
              ? null
              : new Date().getTime(),
          })
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFooterMainButtonLoading(false);
    }
  }

  function toggleMicrophone() {
    if (currentParticipantPermissions?.canPublish && isCurrentlyPublishing) {
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

  useEffect(() => {
    if (currentPublisherMetadata?.startPublishAt) {
      interval = setInterval(async () => {
        const now = new Date().getTime();
        const diff = Math.floor(
          (now - currentPublisherMetadata.startPublishAt) / 1000
        );
        const remaining = PUBLISH_DURATION_SECONDS - diff;

        if (remaining <= 0) {
          await handleStopPublishing();
          setRemainingSeconds(PUBLISH_DURATION_SECONDS);
          return;
        }

        setRemainingSeconds(remaining);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
      interval = null;
      setRemainingSeconds(PUBLISH_DURATION_SECONDS);
    }
  }, [currentPublisherMetadata?.startPublishAt, handleStopPublishing]);

  useEffect(() => {
    if (myPositionInQueue === 1 && !canPublish && !isCurrentlyPublishing) {
      console.log('set can publish');
      setCanPublish(true);
      currentParticipant.localParticipant.setMetadata(
        JSON.stringify({
          ...currentParticipantMetadata,
          canPublishAt: new Date().getTime(),
        })
      );
    }
  }, [
    currentParticipant.localParticipant,
    canPublish,
    myPositionInQueue,
    currentParticipantMetadata,
    isCurrentlyPublishing,
  ]);

  return (
    <>
      {!ready && <Ready onReady={handleReady} />}
      <div ref={audioElContainer} />
      {tracks.map((trackRef) => (
        <AudioTrack key={trackRef.publication.trackSid} {...trackRef} />
      ))}
      <Box
        sx={{
          display: ready ? { xs: 'block', md: 'flex' } : 'none',
          height: '100%',
          position: 'relative',
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
            main={{
              status: {
                text: statusText,
              },
              timer: {
                enabled: !!currentPublisherMetadata?.startPublishAt,
                timeRemaining: remainingSeconds,
              },
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
                connectionQuality: quality,
              },
              position: myPositionInQueue,
              mainButton: {
                label: micPermissionError || footerMainButtonLabel,
                onClick: handleMainButtonClick,
                loading: footerMainButtonLoading,
              },
              chat: {
                toggle: toggleChat,
                open: chatOpen,
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: chatOpen ? 'block' : 'none',
            position: { xs: 'absolute', md: 'initial' },
            top: 0,
            width: { xs: '100%', md: '300px' },
            height: '100%',
            backgroundColor: 'background.body',
          }}
        >
          <InsideRoomRightSide
            authenticated={authenticated}
            closeChat={() => setChatOpen(false)}
          />
        </Box>
      </Box>
    </>
  );
}
