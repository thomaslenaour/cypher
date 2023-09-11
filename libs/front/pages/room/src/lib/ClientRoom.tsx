'use client';

import { LiveKitRoom } from '@livekit/components-react';
import { Box, Container } from '@cypher/front/shared/ui';
import { InsideRoom } from './components/InsideRoom/InsideRoom';
import { useState } from 'react';
import { RoomLoader } from './components/RoomLoader';

interface ClientRoomProps {
  initialToken: string;
  roomId: string;
  authenticated: boolean;
}

export function ClientRoom({
  initialToken,
  roomId,
  authenticated,
}: ClientRoomProps) {
  const [connected, setConnected] = useState(false);

  return (
    <Container>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 'calc(100vh - 73px)',
        }}
      >
        <LiveKitRoom
          token={initialToken}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL}
          connect={true}
          video={false}
          audio={false}
          onConnected={() => setConnected(true)}
        >
          {!connected ? (
            <RoomLoader />
          ) : (
            <InsideRoom roomId={roomId} authenticated={authenticated} />
          )}
        </LiveKitRoom>
      </Box>
    </Container>
  );
}

export default ClientRoom;
