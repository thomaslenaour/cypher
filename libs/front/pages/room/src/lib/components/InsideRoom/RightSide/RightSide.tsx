import { Box } from '@cypher/front/shared/ui';

import { Queue } from './Queue/Queue';
import { Chat } from './Chat/Chat';

export function InsideRoomRightSide() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ height: '50%', position: 'relative', zIndex: '0' }}>
        <Queue />
      </Box>
      <Box sx={{ height: '50%', position: 'relative', zIndex: '1' }}>
        <Chat />
      </Box>
    </Box>
  );
}
