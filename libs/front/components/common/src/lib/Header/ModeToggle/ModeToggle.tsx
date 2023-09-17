'use client';

import { useColorScheme, IconButton } from '@cypher/front/shared/ui';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton variant="soft" color="neutral" sx={{ width: 24 }} />;
  }

  return (
    <IconButton
      variant="soft"
      color="neutral"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      sx={{
        width: {
          xs: '100%',
          md: 'auto',
        },
      }}
    >
      {mode === 'dark' ? <Moon /> : <Sun />}
    </IconButton>
  );
}
