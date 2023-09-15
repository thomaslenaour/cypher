import { Container, Stack, Typography } from '@cypher/front/shared/ui';
import { SearchX } from 'lucide-react';

interface NotFoundProps {
  pseudo: string;
}

export const NotFound = ({ pseudo }: NotFoundProps) => (
  <Container>
    <Stack direction={'row'} gap={'.625rem'} justifyContent={'center'}>
      <SearchX />
      <Typography>
        No user found for the pseudo :{' '}
        <Typography sx={{ fontWeight: 'bold' }}>{pseudo}</Typography>
      </Typography>
    </Stack>
  </Container>
);
