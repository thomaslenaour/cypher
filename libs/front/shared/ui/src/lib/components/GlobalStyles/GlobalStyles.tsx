'use client';

import JoyGlobalStyles from '@mui/joy/GlobalStyles';

export function GlobalStyles() {
  return (
    <JoyGlobalStyles
      styles={{
        a: { textDecoration: 'none', color: 'inherit' },
        body: {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
      }}
    />
  );
}

export default GlobalStyles;
