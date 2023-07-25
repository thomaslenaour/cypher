'use client';

import { Box } from '@cypher/front/shared/ui';

import { InsideRoomLeftSide } from './components/InsideRoom/LeftSide';
import { InsideRoomRightSide } from './components/InsideRoom/RightSide';
import { InsideRoomMiddleArea } from './components/InsideRoom/MiddleArea';

interface InsideRoomProps {
  roomId: string;
}

export function InsideRoom({ roomId }: InsideRoomProps) {
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
        <InsideRoomMiddleArea roomId={roomId} />
      </Box>
      <InsideRoomRightSide />
    </Box>
  );
}
