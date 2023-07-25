import { Box, Button, Typography } from '@cypher/front/shared/ui';
import { Mic } from 'lucide-react';

export function InsideRoomLeftSide() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '150px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box p={2}>
        <Typography level="h4" fontWeight={700}>
          Instrus
        </Typography>
        <ul>
          <li>xxxx</li>
          <li>xxxx</li>
          <li>xxxx</li>
          <li>xxxx</li>
        </ul>
      </Box>
      <Box>
        <Button startDecorator={<Mic />} fullWidth>
          Activer
        </Button>
      </Box>
    </Box>
  );
}
