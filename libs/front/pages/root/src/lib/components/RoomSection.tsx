import { RoomList } from '@cypher/front/components/rooms/server';
import { RoomObjectType } from '@cypher/front/shared/graphql';
import { Container, Typography } from '@cypher/front/shared/ui';

interface RoomSectionProps {
  rooms: RoomObjectType[];
}

export function RoomSection({ rooms }: RoomSectionProps) {
  return (
    <Container sx={{ py: 5 }}>
      <Typography level="h3" fontWeight={800} mb={1}>
        Rooms
      </Typography>
      <RoomList rooms={rooms} />
    </Container>
  );
}

export default RoomSection;
