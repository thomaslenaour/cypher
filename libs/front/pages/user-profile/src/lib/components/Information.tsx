import { Box, Divider, Stack, Typography } from '@cypher/front/shared/ui';
import { SxProps } from '@mui/joy/styles/types';
import { format } from 'date-fns';

interface IInformationProps {
  createdAt: Date;
  pseudo: string;
  punchline?: string;
  userName?: string;
}

const styles: SxProps = {
  '& > .sub-information': {
    margin: '.625rem 0',
    color: 'neutral.600',
  },
};

export const Information = ({
  createdAt,
  pseudo,
  punchline,
  userName,
}: IInformationProps) => {
  const formattedDate = format(new Date(createdAt), 'LLLL yyyy');

  return (
    <Box sx={styles}>
      <Typography level="h5">{userName ?? pseudo} HA</Typography>
      {punchline && <Typography className="punchline">{punchline}</Typography>}
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" />}
        spacing={2}
        className="sub-information"
      >
        <Typography level="body2">@{pseudo}</Typography>
        <Typography level="body2">Joined Cypher in {formattedDate}</Typography>
      </Stack>
    </Box>
  );
};
