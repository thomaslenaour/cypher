import MuiContainer, {
  ContainerProps as MuiContainerProps,
} from '@mui/joy/Container';
import { forwardRef } from 'react';

export type ContainerProps = MuiContainerProps;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, ...props }, ref) => {
    return (
      <MuiContainer ref={ref} {...props}>
        {children}
      </MuiContainer>
    );
  }
);

export { Container };
