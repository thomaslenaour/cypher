import { Container, Stack, Typography } from '@cypher/front/shared/ui';
import { SearchX } from 'lucide-react';

interface INotFoundProps {
  pseudo: string;
}

export const NotFound = ({ pseudo }: INotFoundProps) => (
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
