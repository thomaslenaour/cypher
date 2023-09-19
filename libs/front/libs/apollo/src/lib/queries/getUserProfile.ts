import { GetUserProfileDocument } from '@cypher/front/shared/graphql';
import { getClient } from '../client';

export const getUserProfile = async (
  key: 'pseudo' | 'userId',
  value: string
) => {
  const appolloClient = getClient();

  const res = await appolloClient.query({
    query: GetUserProfileDocument,
    variables: {
      key,
      value,
    },
  });

  return res.data.userProfile;
};
