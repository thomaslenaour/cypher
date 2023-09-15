import { Stack, Typography } from '@cypher/front/shared/ui';

interface InsightProps {
  label: string;
  value: string | number;
}

export const Insight = ({ label, value }: InsightProps) => (
  <Stack direction={'row'} gap={0.5}>
    <Typography color="primary" fontWeight={700}>
      {value}
    </Typography>
    <Typography>{label}</Typography>
  </Stack>
);
