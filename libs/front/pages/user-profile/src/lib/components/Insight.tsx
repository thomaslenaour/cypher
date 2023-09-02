import { Box, Stack, SxProps, Typography } from '@cypher/front/shared/ui';
import { Mic2 } from 'lucide-react';

interface IInsight {
  label: string;
  value: string | number;
}

const styles: SxProps = {
  borderRadius: '.65rem',
  backgroundColor: 'primary.100',
  padding: '.625rem .9375rem',
  height: 'fit-content',

  '& > .value': {
    color: 'primary.500',
  },

  '& > .label': {
    color: 'primary.800',
  },
};

export const Insight = ({ label, value }: IInsight) => {
  return (
    <Box className="insight" sx={styles}>
      <Typography className="value" level="h5">
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Mic2 />
          {value}
        </Stack>
      </Typography>

      <Typography className="label" level="body2">
        {label}
      </Typography>
    </Box>
  );
};
