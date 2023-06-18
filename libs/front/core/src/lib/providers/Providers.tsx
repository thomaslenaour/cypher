'use client';

import { SessionProvider } from 'next-auth/react';

import {
  CssVarsProvider,
  theme,
  CssBaseline,
  GlobalStyles,
} from '@cypher/front/shared/ui';
import { FRONT_ACCESS_TOKEN_REFETCH_INTERVAL_IN_SECONDS } from '@cypher/shared/config/authentication';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          a: { textDecoration: 'none', color: 'inherit' },
        }}
      />
      <SessionProvider
        refetchInterval={FRONT_ACCESS_TOKEN_REFETCH_INTERVAL_IN_SECONDS}
        refetchOnWindowFocus
      >
        {children}
      </SessionProvider>
    </CssVarsProvider>
  );
}

export default Providers;
