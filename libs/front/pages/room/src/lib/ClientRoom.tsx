'use client';

import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import { Container } from '@cypher/front/shared/ui';
import { InsideRoom } from './components/InsideRoom/InsideRoom';

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
  return (
    <Container>
      <LiveKitRoom
        token={initialToken}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL}
        connect={true}
        video={false}
        audio={false}
      >
        <InsideRoom roomId={roomId} authenticated={authenticated} />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </Container>
  );
}

export default ClientRoom;
