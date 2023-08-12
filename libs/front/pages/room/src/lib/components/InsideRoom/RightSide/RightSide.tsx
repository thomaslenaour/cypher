import { Chat } from '@livekit/components-react';

import { Box, Typography } from '@cypher/front/shared/ui';
import { Queue } from './Queue/Queue';

export function InsideRoomRightSide() {
  return (
    <Box
      sx={{
        p: 1,
        height: '100%',
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Queue />
      <Box>
        <Typography level="h4" fontWeight={700}>
          Chat
        </Typography>
        <Chat />
      </Box>
    </Box>
  );
}
