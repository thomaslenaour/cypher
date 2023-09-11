'use client';

import { SessionProvider } from 'next-auth/react';

import {
  ThemeRegistry,
  getInitColorSchemeScript,
} from '@cypher/front/shared/ui';
import { FRONT_ACCESS_TOKEN_REFETCH_INTERVAL_IN_SECONDS } from '@cypher/shared/config/authentication';
import { ApolloProvider } from '@cypher/front/libs/apollo';

interface ProvidersProps {
  children: React.ReactNode;
  authToken: string;
}

export function Providers({ children, authToken = '' }: ProvidersProps) {
  return (
    <>
      {getInitColorSchemeScript()}
      <SessionProvider
        refetchInterval={FRONT_ACCESS_TOKEN_REFETCH_INTERVAL_IN_SECONDS}
        refetchOnWindowFocus
      >
        <ApolloProvider authToken={authToken}>
          <ThemeRegistry>{children}</ThemeRegistry>
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}

export default Providers;
