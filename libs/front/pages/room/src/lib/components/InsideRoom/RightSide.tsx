import { Box, Typography } from '@cypher/front/shared/ui';
import { Chat, useParticipants } from '@livekit/components-react';

export function InsideRoomRightSide() {
  const participants = useParticipants();
  const participantsInQueue = participants
    .filter((participant) => {
      if (participant.metadata) {
        const parsedMetadata = JSON.parse(participant.metadata);
        return !!parsedMetadata?.inQueueAt;
      }
      return false;
    })
    .sort((a, b) => {
      if (a.metadata && b.metadata) {
        const parsedMetadataA = JSON.parse(a.metadata);
        const parsedMetadataB = JSON.parse(b.metadata);

        if (parsedMetadataA.inQueueAt && parsedMetadataB.inQueueAt) {
          return parsedMetadataB.inQueueAt - parsedMetadataA.inQueueAt;
        }
      }
      return 0;
    });

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
          File d'attente
        </Typography>
        <ol>
          {participantsInQueue.map((participant) => (
            <li key={participant.sid}>{participant.identity}</li>
          ))}
        </ol>
      </Box>
      <Box>
        <Typography level="h4" fontWeight={700}>
          Chat
        </Typography>
        <Chat />
      </Box>
    </Box>
  );
}
