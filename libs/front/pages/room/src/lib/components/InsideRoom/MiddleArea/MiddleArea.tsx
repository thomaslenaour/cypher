'use client';

import { useMemo } from 'react';
import {
  useLocalParticipant,
  useParticipants,
} from '@livekit/components-react';

import { Box, Typography } from '@cypher/front/shared/ui';
import { StartPublishingDocument } from '@cypher/front/shared/graphql';
import { useMutation } from '@cypher/front/libs/apollo';
import { Participants } from './Participants/Participants';

interface InsideRoomMiddleProps {
  roomId: string;
  onMicrophoneOpen: () => void;
  authenticated: boolean;
}

export function InsideRoomMiddleArea({
  roomId,
  onMicrophoneOpen,
  authenticated,
}: InsideRoomMiddleProps) {
  const currentParticipant = useLocalParticipant();
  const participants = useParticipants();
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
  const iAmThePublisher =
    currentParticipant?.localParticipant?.identity ===
    currentPublisher?.identity;

  const [startPublishing, { loading }] = useMutation(StartPublishingDocument);

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

      console.log('response', response);

      if (response.data?.startPublishing) {
        onMicrophoneOpen();
      }

      console.log('lets go');
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
      <Box sx={{ height: '50%' }}>
        <Typography>Current Publisher section</Typography>
      </Box>
      <Box sx={{ height: '50%' }}>
        <Participants
          roomId={roomId}
          authenticated={authenticated}
          onPublishingClick={handleStartPublishingClick}
        />
      </Box>
    </Box>
  );
}
