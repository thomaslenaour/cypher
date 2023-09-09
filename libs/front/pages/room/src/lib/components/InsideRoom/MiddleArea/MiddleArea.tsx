'use client';

import { useMemo } from 'react';
import {
  StartAudio,
  useLocalParticipant,
  useParticipants,
} from '@livekit/components-react';
import { Info } from 'lucide-react';

import { Box, Chip } from '@cypher/front/shared/ui';
import { StartPublishingDocument } from '@cypher/front/shared/graphql';
import { useMutation } from '@cypher/front/libs/apollo';

import { Participants } from './Participants/Participants';

interface InsideRoomMiddleProps {
  roomId: string;
  onMicrophoneOpen: () => void;
  authenticated: boolean;
  micPermissionEnabled?: boolean;
}

export function InsideRoomMiddleArea({
  roomId,
  onMicrophoneOpen,
  authenticated,
  micPermissionEnabled,
}: InsideRoomMiddleProps) {
  const currentParticipant = useLocalParticipant();
  const participants = useParticipants();
  const participantsInQueue = useMemo(() => {
    return participants.filter((participant) => {
      if (participant?.metadata) {
        const parsedMetadata = JSON.parse(participant.metadata);
        return parsedMetadata?.inQueueAt;
      }
      return false;
    });
  }, [participants]);
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

  const [startPublishing] = useMutation(StartPublishingDocument);

  const handleStartPublishingClick = async () => {
    if (!iAmThePublisher) return;

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
        onMicrophoneOpen();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ height: '50%', p: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <Chip color="primary" size="lg" startDecorator={<Info />}>
            {!currentPublisher &&
              participantsInQueue?.length === 0 &&
              "Aucun artiste présent dans la file d'attente..."}
            {!currentPublisher &&
              participantsInQueue?.length >= 1 &&
              'Attribution du micro en cours...'}
            {currentPublisher &&
              !currentPublisherMetadata?.startPublishAt &&
              `C'est au tour ${currentPublisher?.name} de s'exprimer...`}
            {currentPublisher &&
              currentPublisherMetadata?.startPublishAt &&
              `${currentPublisher?.name} est en train de rapper !`}
          </Chip>
          <StartAudio label="Play the room" />
        </Box>
      </Box>
      <Box sx={{ height: '50%' }}>
        <Participants
          roomId={roomId}
          authenticated={authenticated}
          onPublishingClick={handleStartPublishingClick}
          micPermissionEnabled={micPermissionEnabled}
        />
      </Box>
    </Box>
  );
}
