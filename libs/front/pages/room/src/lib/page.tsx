import { Header } from '@cypher/front/components/common/server';
import { Typography, Box } from '@cypher/front/shared/ui';
import ClientRoom from './ClientRoom';
import { getClient } from '@cypher/front/libs/apollo/server';
import {
  JoinPublicRoomDocument,
  JoinRoomDocument,
} from '@cypher/front/shared/graphql';
import { authOptions, getServerSession } from '@cypher/front/libs/auth/server';

interface RoomPageProps {
  params: {
    id: string;
  };
}

export async function RoomPage({ params }: RoomPageProps) {
  const session = await getServerSession(authOptions);
  let token;

  if (session) {
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
    token = response.data?.joinRoom;
  } else {
    const response = await getClient().mutate({
      mutation: JoinPublicRoomDocument,
      variables: {
        roomId: params.id,
      },
      context: {
        fetchOptions: {
          cache: 'no-store',
        },
      },
    });
    token = response.data?.joinPublicRoom;
  }

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
        <ClientRoom
          initialToken={token}
          roomId={params.id}
          authenticated={!!session}
        />
      </Box>
    </>
  );
}

export default RoomPage;
