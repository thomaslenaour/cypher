import { useParticipants } from '@livekit/components-react';

import { Box, Typography } from '@cypher/front/shared/ui';

import type { LivekitMetadata } from '@cypher/shared/types';
import { QueueList } from './QueueList';

export function Queue() {
  const participants = useParticipants();
  const participantsInQueue = participants
    .filter((participant) => {
      if (participant?.metadata) {
        const parsedMetadata = JSON.parse(
          participant.metadata
        ) as LivekitMetadata;
        return !!parsedMetadata?.inQueueAt;
      }

      return false;
    })
    .map((participant) => ({
      ...participant,
      metadata: JSON.parse(participant.metadata as string) as LivekitMetadata,
    }))
    .sort((a, b) => {
      if (!a.metadata?.inQueueAt || !b.metadata?.inQueueAt) return 0;

      return a.metadata.inQueueAt - b.metadata.inQueueAt;
    })
    .map((participant) => ({
      sid: participant.sid,
      name: participant?.name || 'Anonymous',
      inQueueAt: participant.metadata?.inQueueAt,
    }));

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography
        level="title-lg"
        fontWeight={700}
        sx={{ p: 1, borderBottom: '1px #EAEEF6 solid' }}
      >
        File d'attente
      </Typography>
      <QueueList participants={participantsInQueue} />
    </Box>
  );
}
