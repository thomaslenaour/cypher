import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { setContext } from '@apollo/client/link/context';

import { authOptions, getServerSession } from '@cypher/front/libs/auth/server';

const authLink = setContext(async (_, { headers }) => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken || '';

  return {
    headers: {
      ...headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
});

export const { getClient } = registerApolloClient(() => {
  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
  });
});
