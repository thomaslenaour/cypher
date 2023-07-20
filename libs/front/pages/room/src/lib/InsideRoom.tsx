'use client';

import { Avatar, Box, Button, Typography } from '@cypher/front/shared/ui';
import {
  Chat,
  ParticipantLoop,
  useParticipantContext,
  useParticipants,
} from '@livekit/components-react';
import { Mic } from 'lucide-react';
import { TakeMicButton } from './components/TakeMicButton';

function InsideRoomLeftSide() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box p={2}>
        <Typography level="h4" fontWeight={700}>
          🎵 Instrus
        </Typography>
        <ul>
          <li>xxxx</li>
          <li>xxxx</li>
          <li>xxxx</li>
          <li>xxxx</li>
        </ul>
      </Box>
      <Box>
        <Button startDecorator={<Mic />} fullWidth>
          Activer
        </Button>
      </Box>
    </Box>
  );
}

function InsideRoomRightSide() {
  const participants = useParticipants();

  console.log('InsideRoomRightSide: participants', participants);

  return (
    <Box
      sx={{
        height: '100%',
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box p={2}>
        <Typography level="h4" fontWeight={700}>
          🎙️ File d'attente
        </Typography>
        <ol>
          <li>user1</li>
          <li>user2</li>
          <li>user3</li>
          <li>user4</li>
        </ol>
      </Box>
      <Box>
        <Typography level="h4" fontWeight={700}>
          💬 Chat
        </Typography>
        <Chat />
      </Box>
    </Box>
  );
}

function InsideRoomMiddle() {
  const participants = useParticipants();

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
        <TakeMicButton />
      </Box>
    </Box>
  );
}

function ParticipantItem() {
  const participant = useParticipantContext();

  return <Avatar size="lg">{participant.identity}</Avatar>;
}

export function InsideRoom() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'common.white',
        borderRadius: '16px',
        borderColor: 'neutral.100',
        height: '600px',
      }}
    >
      <InsideRoomLeftSide />
      <Box
        sx={{
          flex: 1,
          borderLeft: '1px solid',
          borderRight: '1px solid',
          borderColor: 'neutral.100',
        }}
      >
        <InsideRoomMiddle />
      </Box>
      <InsideRoomRightSide />
    </Box>
  );
}
