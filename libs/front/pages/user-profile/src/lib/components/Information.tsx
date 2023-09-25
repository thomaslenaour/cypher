import { Box, Stack, Typography } from '@cypher/front/shared/ui';
import { SxProps } from '@mui/joy/styles/types';
import { format } from 'date-fns';

interface InformationProps {
  createdAt: Date;
  pseudo: string;
  punchline?: string | null;
  name?: string | null;
  sx?: SxProps;
}

export const Information = ({
  createdAt,
  pseudo,
  punchline,
  name,
  sx,
}: InformationProps) => {
  const formattedDate = format(new Date(createdAt), 'yyyy');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0.2,
        ...sx,
      }}
    >
      <Typography level="h3">{name ?? pseudo}</Typography>
      {punchline && <Typography>{punchline}</Typography>}
      <Stack direction={'row'} gap={1} alignItems={'center'}>
        <Typography level="body-sm" color="primary">
          @{pseudo}
        </Typography>
        <Typography level="body-sm">
          A rejoint Cypher en {formattedDate}
        </Typography>
      </Stack>
    </Box>
  );
};
