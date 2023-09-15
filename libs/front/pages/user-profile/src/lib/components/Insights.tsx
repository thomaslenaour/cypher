import { Stack } from '@cypher/front/shared/ui';
import { Insight } from './Insight';

interface InsightsProps {
  contributions: number;
  followers: number;
}

export const Insights = ({ contributions, followers }: InsightsProps) => {
  const contributionsLabel = `Participation${contributions > 1 ? 's' : ''}`;
  const followersLabel = `Abonné${followers > 1 ? 's' : ''}`;

  return (
    <Stack direction={'row'} gap={2}>
      <Insight label={contributionsLabel} value={contributions} />
      <Insight label={followersLabel} value={followers} />
    </Stack>
  );
};
