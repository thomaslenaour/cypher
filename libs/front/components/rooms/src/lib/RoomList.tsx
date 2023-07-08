import Link from 'next/link';

import { RoomObjectType } from '@cypher/front/shared/graphql';
import { Grid } from '@cypher/front/shared/ui';
import RoomCard from './RoomCard';

interface RoomListProps {
  rooms: RoomObjectType[];
}

export function RoomList({ rooms }: RoomListProps) {
  return (
    <Grid container spacing={2}>
      {rooms.map((room) => (
        <Grid xs={3} key={room.id}>
          <Link href={`/rooms/${room.id}`}>
            <RoomCard
              name={room.name}
              participantNumber={room.participantsNumber}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default RoomList;
