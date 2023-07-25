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
        video={false}
        audio={true}
        connect={true}
      >
        <InsideRoom roomId={roomId} />
        <RoomAudioRenderer />
      </LiveKitRoom>
    </Container>
  );
}

export default ClientRoom;
