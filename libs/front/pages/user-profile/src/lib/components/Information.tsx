import { Box, Divider, Stack, Typography } from '@cypher/front/shared/ui';
import { SxProps } from '@mui/joy/styles/types';
import { format } from 'date-fns';

interface InformationProps {
  createdAt: Date;
  pseudo: string;
  punchline?: string;
  userName?: string;
  sx?: SxProps;
}

const styles: SxProps = {
  '& > .sub-information': {
    margin: '.625rem 0',
  },
};

export const Information = ({
  createdAt,
  pseudo,
  punchline,
  userName,
  sx,
}: InformationProps) => {
  const formattedDate = format(new Date(createdAt), 'yyyy');

  return (
    <Box
      sx={{
        ...styles,
        ...sx,
      }}
    >
      <Typography level="title-lg">{userName ?? pseudo} HA</Typography>
      {punchline && <Typography className="punchline">{punchline}</Typography>}
      <Stack
        direction="row"
        alignItems="center"
        divider={<Divider orientation="vertical" />}
        spacing={1}
        className="sub-information"
      >
        <Typography level="body-md" color="primary">
          @{pseudo}
        </Typography>
        <Typography level="body-sm">
          A rejoint Cypher en {formattedDate}
        </Typography>
      </Stack>
    </Box>
  );
};
