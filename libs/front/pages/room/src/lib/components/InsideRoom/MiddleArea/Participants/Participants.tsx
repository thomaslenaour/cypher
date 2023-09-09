import { Avatar, Box, Tooltip, Typography } from '@cypher/front/shared/ui';
import { TakeMicButton } from '../TakeMicButton';
import avatarDefault from '../../avatar-default.png';
import { useParticipants } from '@livekit/components-react';

interface ParticipantsProps {
  roomId: string;
  authenticated: boolean;
  onPublishingClick: () => Promise<void>;
  micPermissionEnabled?: boolean;
}

export function Participants({
  roomId,
  authenticated,
  onPublishingClick,
  micPermissionEnabled,
}: ParticipantsProps) {
  const participants = useParticipants();

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        level="title-lg"
        fontWeight={700}
        sx={{
          borderBottom: '1px #EAEEF6 solid',
          borderTop: '1px #EAEEF6 solid',
          p: 1,
        }}
      >
        Utilisateurs dans la room
      </Typography>
      <Box
        sx={{
          p: 1,
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 0.5,
          }}
        >
          {participants.map((p) => (
            <ParticipantItem key={p.sid} name={p?.name} />
          ))}
        </Box>
      </Box>
      <TakeMicButton
        roomId={roomId}
        authenticated={authenticated}
        onPublishingClick={onPublishingClick}
        micPermissionEnabled={micPermissionEnabled}
      />
    </Box>
  );
}

interface ParticipantItemProps {
  name?: string;
}

function ParticipantItem({ name }: ParticipantItemProps) {
  return (
    <Tooltip size="sm" title={name || 'Anonymous'} sx={{ cursor: 'pointer' }}>
      <Avatar src={avatarDefault.src} />
    </Tooltip>
  );
}
