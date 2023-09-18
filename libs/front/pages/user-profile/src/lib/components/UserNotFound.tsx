import { Button, Container, Stack, Typography } from '@cypher/front/shared/ui';
import { SearchX } from 'lucide-react';
import Link from 'next/link';

interface UserNotFoundProps {
  pseudo: string;
}

export const UserNotFound = ({ pseudo }: UserNotFoundProps) => (
  <Container>
    <Stack
      mt={5}
      gap={2}
      direction={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Stack
        direction={'row'}
        gap={1}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <SearchX />
        <Typography level="title-md">
          Aucun utilisateur avec le pseudo{' '}
          <Typography sx={{ fontWeight: 'bold' }}>{pseudo}</Typography> trouvé.
        </Typography>
      </Stack>
      <Link href="/">
        <Button>Page principale</Button>
      </Link>
    </Stack>
  </Container>
);
