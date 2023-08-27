'use client';

import { Box, Typography } from '@cypher/front/shared/ui';
import { Disc } from 'lucide-react';

export function Beats() {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography
        level="h5"
        fontWeight={700}
        sx={{ p: 1, borderBottom: '1px #EAEEF6 solid' }}
      >
        Prochains beats
      </Typography>
      <Box>
        <SingleBeat />
        <SingleBeat />
        <SingleBeat />
        <SingleBeat />
      </Box>
    </Box>
  );
}

const SingleBeat = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
      <Disc size="32px" color="gray" />
      <Box>
        <Typography level="body3">Type Beat "Taciturne"</Typography>
        <Typography level="body4">Prod. by @thomaslenaour</Typography>
      </Box>
    </Box>
  );
};
