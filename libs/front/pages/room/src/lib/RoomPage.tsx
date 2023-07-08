import { Header } from '@cypher/front/components/common/server';
import { Typography } from '@cypher/front/shared/ui';
import ClientRoom from './ClientRoom';
import { getClient } from '@cypher/front/libs/apollo/server';
import { JoinRoomDocument } from '@cypher/front/shared/graphql';

interface RoomPageProps {
  params: {
    id: string;
  };
}

export async function RoomPage({ params }: RoomPageProps) {
  const response = await getClient().mutate({
    mutation: JoinRoomDocument,
    variables: {
      roomId: params.id,
    },
  });
  const token = response.data?.joinRoom;

  if (!token) {
    throw new Error('No token');
  }

  return (
    <>
      <Header />
      <Typography level="h2" sx={{ textAlign: 'center' }}>
        Room Name
      </Typography>
      <ClientRoom initialToken={token} />
    </>
  );
}

export default RoomPage;
