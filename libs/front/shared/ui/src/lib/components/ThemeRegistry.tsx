'use client';

import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { theme } from '../theme';
import { GlobalStyles } from './GlobalStyles/GlobalStyles';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'joy' }}>
      <CssVarsProvider
        defaultMode="system"
        theme={theme}
        modeStorageKey="cypher-system-mode"
        disableNestedContext
      >
        <CssBaseline />
        <GlobalStyles />
        {children}
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
