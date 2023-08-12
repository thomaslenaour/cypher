'use client';

import avatarDefault from '../avatar-default.png';

import { useMemo } from 'react';
import {
  ParticipantLoop,
  useLocalParticipant,
  useParticipantContext,
  useParticipants,
} from '@livekit/components-react';

import { Avatar, Box, Button, Typography } from '@cypher/front/shared/ui';
import { StartPublishingDocument } from '@cypher/front/shared/graphql';
import { useMutation } from '@cypher/front/libs/apollo';

import { TakeMicButton } from './TakeMicButton';
import { Play } from 'lucide-react';

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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box mb={2}>
            {currentPublisher ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography level="h4" textAlign="center">
                  {currentPublisher.name} est en train de rapper !
                </Typography>
                <Avatar src={avatarDefault.src} size="lg" />
                <Typography textAlign="center">
                  {currentPublisher.name}
                </Typography>
              </Box>
            ) : (
              'Aucun publisher'
            )}
          </Box>
          <Box>
            <Typography textAlign="center">Dans la room</Typography>
            <ParticipantLoop participants={participants}>
              <ParticipantItem />
            </ParticipantLoop>
          </Box>
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
          <Button
            startDecorator={<Play />}
            onClick={handleStartPublishingClick}
            loading={loading}
          >
            Je clique et je commence à rapper
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar src={avatarDefault.src} />
      <Typography level="body4" textAlign="center">
        {participant.name}
      </Typography>
    </Box>
  );
}
