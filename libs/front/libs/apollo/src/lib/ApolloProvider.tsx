'use client';

import { useCallback } from 'react';
import { ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';

import { getClientSession } from '@cypher/front/libs/auth';

interface ApolloProviderWrapperProps {
  children: React.ReactNode;
  authToken: string;
}

export function ApolloProvider({
  children,
  authToken = '',
}: ApolloProviderWrapperProps) {
  const windowIsUndefined = typeof window === 'undefined';

  const getToken = useCallback(async () => {
    if (windowIsUndefined) {
      return authToken || '';
    }

    const session = await getClientSession();

    return session?.accessToken || '';
  }, [windowIsUndefined, authToken]);

  const makeClient = useCallback(() => {
    const httpLink = new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    });
    const authLink = setContext(async (_, { headers }) => {
      const token = await getToken();

      return {
        headers: {
          ...headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      };
    });

    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link: windowIsUndefined
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink,
            httpLink,
          ])
        : ApolloLink.from([authLink, httpLink]),
    });
  }, [getToken, windowIsUndefined]);

  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
