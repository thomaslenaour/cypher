import { Header } from '@cypher/front/components/common/server';
import { getClient } from '@cypher/front/libs/apollo/server';
import { GetRoomsDocument } from '@cypher/front/shared/graphql';

import RoomSection from './components/RoomSection';

export async function HomePage() {
  const response = await getClient().query({
    query: GetRoomsDocument,
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <RoomSection rooms={response.data.rooms} />
    </>
  );
}
export default HomePage;
