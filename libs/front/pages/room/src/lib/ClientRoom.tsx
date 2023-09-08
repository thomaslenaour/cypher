'use client';

import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from '@cypher/front/shared/ui';
import { InsideRoom } from './components/InsideRoom/InsideRoom';
import { useState } from 'react';

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
  console.log('connected', connected);

  return (
    <Container>
      <LiveKitRoom
        token={initialToken}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL}
        connect={true}
        video={false}
        audio={false}
        onConnected={() => setConnected(true)}
      >
        {!connected ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Connexion en cours...</Typography>
          </Box>
        ) : (
          <>
            <InsideRoom roomId={roomId} authenticated={authenticated} />
            <RoomAudioRenderer />
          </>
        )}
      </LiveKitRoom>
    </Container>
  );
}

export default ClientRoom;
