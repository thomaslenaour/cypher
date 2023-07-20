import { Header } from '@cypher/front/components/common/server';
import { Typography, Box } from '@cypher/front/shared/ui';
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
    context: {
      fetchOptions: {
        cache: 'no-store',
      },
    },
  });
  const token = response.data?.joinRoom;

  if (!token) {
    throw new Error('No token');
  }

  return (
    <>
      <Header />
      <Box sx={{ py: 5 }}>
        <Typography level="h3" fontWeight={700} textAlign="center" mb={2}>
          Room name
        </Typography>
        <ClientRoom initialToken={token} />
      </Box>
    </>
  );
}

export default RoomPage;
