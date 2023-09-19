import { Box, Divider, Stack, Typography } from '@cypher/front/shared/ui';
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
    <Box {...{ sx }}>
      <Typography level="h3">{name ?? pseudo}</Typography>
      {punchline && <Typography>{punchline}</Typography>}
      <Stack
        direction="row"
        alignItems="center"
        divider={<Divider orientation="vertical" />}
        spacing={1}
      >
        <Typography fontStyle={'italic'} level="body-sm" color="primary">
          @{pseudo}
        </Typography>
        <Typography level="body-sm">
          A rejoint Cypher en {formattedDate}
        </Typography>
      </Stack>
    </Box>
  );
};
