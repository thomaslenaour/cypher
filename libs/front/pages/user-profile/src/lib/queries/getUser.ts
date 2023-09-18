import { getClient } from '@cypher/front/libs/apollo/server';
import { GetUserDocument } from '@cypher/front/shared/graphql';

export const getUser = async (userId: string) => {
  const appolloClient = getClient();

  const getUserResponse = await appolloClient.query({
    query: GetUserDocument,
    variables: {
      key: 'id',
      value: userId,
    },
  });

  return getUserResponse.data.user;
};
