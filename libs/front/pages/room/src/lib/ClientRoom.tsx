'use client';

import { LiveKitRoom, RoomAudioRenderer } from '@livekit/components-react';
import { Container } from '@cypher/front/shared/ui';
import { InsideRoom } from './InsideRoom';

interface ClientRoomProps {
  initialToken: string;
  roomId: string;
}

export function ClientRoom({ initialToken, roomId }: ClientRoomProps) {
  return (
    <Container>
      <LiveKitRoom
        token={initialToken}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL}
        connect={true}
        video={false}
        audio={false}
      >
        <InsideRoom roomId={roomId} />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </Container>
  );
}

export default ClientRoom;
