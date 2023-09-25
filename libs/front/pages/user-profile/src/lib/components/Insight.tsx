import { Stack, Typography } from '@cypher/front/shared/ui';

interface InsightProps {
  label: string;
  value: string | number;
  onClick?: () => void;
}

export const Insight = ({ label, value, onClick }: InsightProps) => {
  return (
    <Stack
      sx={{
        ...(onClick && { '&:hover': { cursor: 'pointer' } }),
      }}
      direction={'row'}
      gap={0.5}
      onClick={onClick}
    >
      <Typography color="primary" fontWeight={700}>
        {value}
      </Typography>
      <Typography>{label}</Typography>
    </Stack>
  );
};
