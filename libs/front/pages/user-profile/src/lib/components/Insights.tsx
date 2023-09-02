import { Stack } from '@cypher/front/shared/ui';
import { Insight } from './Insight';

interface IInsightsProps {
  contributions: number;
  followers: number;
}

export const Insights = ({ contributions, followers }: IInsightsProps) => {
  const contributionsLabel = `cypher contribution${
    contributions > 1 ? 's' : ''
  }`;
  const followersLabel = `follower${followers > 1 ? 's' : ''}`;

  return (
    <Stack direction={'row'} gap={1}>
      <Insight label={contributionsLabel} value={contributions} />
      <Insight label={followersLabel} value={followers} />
    </Stack>
  );
};
