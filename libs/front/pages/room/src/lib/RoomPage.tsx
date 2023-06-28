import { Header } from '@cypher/front/components/common/server';
import { Typography } from '@cypher/front/shared/ui';
import ClientRoom from './ClientRoom';
import { getClient } from '@cypher/front/libs/apollo/server';
import { GetTestDocument } from '@cypher/front/shared/graphql';

interface RoomPageProps {
  params: {
    id: string;
  };
}

export async function RoomPage({ params }: RoomPageProps) {
  // @TODO: Get initial room token
  const fetchedToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdCIsInZpZGVvIjp7InJvb21Kb2luIjp0cnVlLCJyb29tIjoiY2xqOHVpZjQ0MDAwMDA4bDNiMmoyNWtxaSIsImNhblB1Ymxpc2giOnRydWV9LCJpYXQiOjE2ODc1NDI5NjUsIm5iZiI6MTY4NzU0Mjk2NSwiZXhwIjoxNjg3NTY0NTY1LCJpc3MiOiJkZXZrZXkiLCJzdWIiOiJ0ZXN0IiwianRpIjoidGVzdCJ9.nf-8W6BZJrtLrliZTQElLI1wNm5Pk5xUVRUQV0mmXEw';

  const data = await getClient().query({
    query: GetTestDocument,
  });

  console.log('++=data', data.data.test);

  return (
    <>
      <Header />
      <Typography level="h2" sx={{ textAlign: 'center' }}>
        Room Name
      </Typography>
      <ClientRoom initialToken={fetchedToken} />
    </>
  );
}

export default RoomPage;
