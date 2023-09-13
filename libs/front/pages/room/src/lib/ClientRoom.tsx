'use client';

import { useEffect, useState } from 'react';
import { LiveKitRoom } from '@livekit/components-react';

import { Box, Container } from '@cypher/front/shared/ui';

import { InsideRoom } from './components/InsideRoom/InsideRoom';
import { RoomLoader } from './components/RoomLoader';
import { WebAudioContext } from './context/web-audio';

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
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    setAudioContext(new AudioContext());

    return () => {
      setAudioContext((prev) => {
        prev?.close();
        return null;
      });
    };
  }, []);

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
          options={{
            expWebAudioMix: { audioContext: audioContext as AudioContext },
          }}
        >
          <WebAudioContext.Provider value={audioContext as AudioContext}>
            {!connected ? (
              <RoomLoader />
            ) : (
              <InsideRoom roomId={roomId} authenticated={authenticated} />
            )}
          </WebAudioContext.Provider>
        </LiveKitRoom>
      </Box>
    </Container>
  );
}

export default ClientRoom;
