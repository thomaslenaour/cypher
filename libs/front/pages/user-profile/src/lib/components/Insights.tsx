import { Box, Typography } from '@cypher/front/shared/ui';
import { SxProps } from '@mui/joy/styles/types';

const styles: SxProps = {
  display: 'flex',
  gap: '.625rem',
  '& > .insight': {
    borderRadius: '.625rem',
    backgroundColor: 'primary.100',
    padding: '.625rem .9375rem',
    height: 'fit-content',
    '& > .value': {
      color: 'primary.500',
    },
    '& > .description': {
      color: 'primary.800',
    },
  },
};

interface IInsightsProps {
  participations: number;
  followers: number;
}

export const Insights = ({ participations, followers }: IInsightsProps) => {
  return (
    <Box id="user-profile-header-insights" sx={styles}>
      <Box className="insight">
        <Typography className="value" level="h5">
          {participations}
        </Typography>
        <Typography className="description" level="body2">
          cypher participation{participations > 1 && 's'}
        </Typography>
      </Box>
      <Box className="insight">
        <Typography className="value" level="h5">
          {followers}
        </Typography>
        <Typography className="description" level="body2">
          follower{followers > 1 && 's'}
        </Typography>
      </Box>
    </Box>
  );
};
