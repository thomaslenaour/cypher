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
  '& > #pseudo': {
    color: 'primary.800',
    fontWeight: 600,
  },
  '& > #punchline': {
    color: 'primary.800',
  },
  '& > #sub-information': {
    margin: '.625rem 0',
    '& > span': {
      color: 'neutral.600',
    },
  },
};

export const Information = ({
  createdAt,
  pseudo,
  punchline,
  userName,
}: IInformationProps) => {
  return (
    <Box id="user-profile-header-information" sx={styles}>
      <Typography level="h5" id="pseudo">
        {userName ?? pseudo}
      </Typography>
      {punchline && <Typography id="punchline">{punchline}</Typography>}
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" />}
        spacing={2}
        id="sub-information"
      >
        <Typography level="body2" component="span">
          @{pseudo}
        </Typography>
        <Typography level="body2" component="span">
          Joined Cypher in {format(new Date(createdAt), 'LLLL yyyy')}
        </Typography>
      </Stack>
    </Box>
  );
};
