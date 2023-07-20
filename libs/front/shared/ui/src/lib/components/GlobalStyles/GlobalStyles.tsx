'use client';

import JoyGlobalStyles from '@mui/joy/GlobalStyles';

export function GlobalStyles() {
  return (
    <JoyGlobalStyles
      styles={{
        a: { textDecoration: 'none', color: 'inherit' },
        body: { backgroundColor: 'var(--joy-palette-neutral-50)' },
      }}
    />
  );
}

export default GlobalStyles;
