import avatarDefault from '../../avatar-default.png';

import { Avatar, Box, Typography } from '@cypher/front/shared/ui';

interface QueueListProps {
  participants: {
    sid: string;
    name: string;
    inQueueAt?: number;
  }[];
}

export function QueueList({ participants }: QueueListProps) {
  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {participants.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Typography level="body2" sx={{ p: 1 }}>
            La file d'attente est vide
          </Typography>
        </Box>
      )}
      {participants.map((participant, index) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            p: 1,
          }}
          key={participant.sid}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box>
              <Avatar src={avatarDefault.src} />
            </Box>
            <Box>
              <Typography level="body2" noWrap>
                {participant.name}
              </Typography>
              {participant?.inQueueAt && (
                <Typography level="body3" noWrap>
                  Joined at{' '}
                  {new Date(participant.inQueueAt).toLocaleTimeString()}
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              p: 1,
              borderRadius: '50%',
              backgroundColor: 'neutral.100',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography level="body3" fontWeight={700}>
              {index + 1}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
