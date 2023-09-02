import { getClient } from '@cypher/front/libs/apollo/server';
import { GetUserProfileDocument } from '@cypher/front/shared/graphql';

export const getProfile = async (pseudo: string) => {
  const appolloClient = getClient();

  const res = await appolloClient.query({
    query: GetUserProfileDocument,
    variables: {
      key: 'pseudo',
      value: pseudo,
    },
  });

  return res.data.userProfile;
};
