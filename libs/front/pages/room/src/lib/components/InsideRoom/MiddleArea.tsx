import { Avatar, Box } from '@cypher/front/shared/ui';
import {
  ParticipantLoop,
  useParticipantContext,
  useParticipants,
} from '@livekit/components-react';
import { TakeMicButton } from '../TakeMicButton';

interface InsideRoomMiddleProps {
  roomId: string;
}

export function InsideRoomMiddleArea({ roomId }: InsideRoomMiddleProps) {
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
        <TakeMicButton roomId={roomId} />
      </Box>
    </Box>
  );
}

function ParticipantItem() {
  const participant = useParticipantContext();

  return <Avatar size="lg">{participant.identity}</Avatar>;
}
