'use client';

import { Box, Switch, Typography } from '@cypher/front/shared/ui';
import { Mic, MicOff } from 'lucide-react';

interface MicToggleProps {
  disabled: boolean;
  value: boolean;
  onToggle: () => void;
}

export function MicToggle({ disabled, onToggle, value }: MicToggleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {value ? <Mic /> : <MicOff />}
      <Switch
        color={value ? 'success' : 'neutral'}
        onChange={onToggle}
        disabled={disabled}
        slotProps={{
          track: {
            children: (
              <>
                <Typography
                  component="span"
                  level="inherit"
                  sx={{ ml: '10px' }}
                >
                  On
                </Typography>
                <Typography component="span" level="inherit" sx={{ mr: '8px' }}>
                  Off
                </Typography>
              </>
            ),
          },
        }}
        sx={{
          '--Switch-thumbSize': '27px',
          '--Switch-trackWidth': '64px',
          '--Switch-trackHeight': '31px',
        }}
      />
    </Box>
  );
}
