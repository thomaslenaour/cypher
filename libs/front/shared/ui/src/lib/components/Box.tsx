'use client';

import MuiBox, { BoxProps as MuiBoxProps } from '@mui/joy/Box';
import { forwardRef } from 'react';

export type BoxProps = MuiBoxProps;

const Box = forwardRef<HTMLElement, BoxProps>(({ children, ...props }, ref) => {
  return (
    <MuiBox ref={ref} {...props}>
      {children}
    </MuiBox>
  );
});

export { Box };
