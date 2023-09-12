'use client';

import { useMemo } from 'react';
import { StartAudio } from '@livekit/components-react';
import { Info } from 'lucide-react';

import { Box, Chip } from '@cypher/front/shared/ui';

import { Participants } from './Participants/Participants';
import { LocalParticipant, RemoteParticipant } from 'livekit-client';

interface InsideRoomMiddleProps {
  roomId: string;
  authenticated: boolean;
  onStartPublishingClick: () => Promise<void>;
  participants: (RemoteParticipant | LocalParticipant)[];
  currentPublisher?: RemoteParticipant | LocalParticipant;
  micPermissionEnabled?: boolean;
}

export function InsideRoomMiddleArea({
  roomId,
  authenticated,
  onStartPublishingClick,
  micPermissionEnabled,
  currentPublisher,
  participants,
}: InsideRoomMiddleProps) {
  const participantsInQueue = useMemo(() => {
    return participants.filter((participant) => {
      if (participant?.metadata) {
        const parsedMetadata = JSON.parse(participant.metadata);
        return parsedMetadata?.inQueueAt;
      }
      return false;
    });
  }, [participants]);

  const currentPublisherMetadata = currentPublisher?.metadata
    ? JSON.parse(currentPublisher.metadata)
    : {};

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
          onPublishingClick={onStartPublishingClick}
          micPermissionEnabled={micPermissionEnabled}
        />
      </Box>
    </Box>
  );
}
