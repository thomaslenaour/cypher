import { GetUserDocument } from '@cypher/front/shared/graphql';
import { getClient } from '../client';

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
