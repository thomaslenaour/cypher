import { Header } from '@cypher/front/components/common/server';
import { Typography } from '@cypher/front/shared/ui';
import ClientRoom from './ClientRoom';

interface RoomPageProps {
  params: {
    id: string;
  };
}

export function RoomPage({ params }: RoomPageProps) {
  // @TODO: Get initial room token

  return (
    <>
      <Header />
      <Typography level="h2" sx={{ textAlign: 'center' }}>
        Room Name
      </Typography>
      <ClientRoom initialToken="<roomTokenGoesHere>" />
    </>
  );
}

export default RoomPage;
