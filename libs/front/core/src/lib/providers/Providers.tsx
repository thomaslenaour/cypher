'use client';

import { SessionProvider } from 'next-auth/react';

import {
  CssVarsProvider,
  theme,
  CssBaseline,
  GlobalStyles,
} from '@cypher/front/shared/ui';
import { FRONT_ACCESS_TOKEN_REFETCH_INTERVAL_IN_SECONDS } from '@cypher/shared/config/authentication';
import { ApolloProvider } from '@cypher/front/libs/apollo';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ApolloProvider>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <SessionProvider
          refetchInterval={FRONT_ACCESS_TOKEN_REFETCH_INTERVAL_IN_SECONDS}
          refetchOnWindowFocus
        >
          {children}
        </SessionProvider>
      </CssVarsProvider>
    </ApolloProvider>
  );
}

export default Providers;
