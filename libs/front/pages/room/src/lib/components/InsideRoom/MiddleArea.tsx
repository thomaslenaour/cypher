'use client';

import { useMemo } from 'react';
import {
  ParticipantLoop,
  useLocalParticipant,
  useParticipantContext,
  useParticipants,
} from '@livekit/components-react';

import { Avatar, Box, Button } from '@cypher/front/shared/ui';
import { StartPublishingDocument } from '@cypher/front/shared/graphql';
import { useMutation } from '@cypher/front/libs/apollo';

import { TakeMicButton } from '../TakeMicButton';

interface InsideRoomMiddleProps {
  roomId: string;
  onMicrophoneOpen: () => void;
}

export function InsideRoomMiddleArea({
  roomId,
  onMicrophoneOpen,
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
        position: 'relative',
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          <ParticipantLoop participants={participants}>
            <div>
              <ParticipantItem />
            </div>
          </ParticipantLoop>
          {currentPublisher ? (
            <pre>Publisher : {currentPublisher.identity}</pre>
          ) : (
            'aucun publisher'
          )}
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {iAmThePublisher ? (
          <Button onClick={handleStartPublishingClick}>
            Let's go ! Je clique et je commence à rapper
          </Button>
        ) : (
          <TakeMicButton roomId={roomId} />
        )}
      </Box>
    </Box>
  );
}

function ParticipantItem() {
  const participant = useParticipantContext();

  return <Avatar size="lg">{participant.identity}</Avatar>;
}
