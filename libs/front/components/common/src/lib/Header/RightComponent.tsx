import { Box, Button } from '@cypher/front/shared/ui';
import Link from 'next/link';
import { LogoutButton } from './LogoutButton';
import { ModeToggle } from './ModeToggle/ModeToggle';

interface HeaderRightComponentProps {
  authenticated: boolean;
}

export function HeaderRightComponent({
  authenticated,
}: HeaderRightComponentProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {authenticated ? (
        <LogoutButton label={'Se déconnecter'} />
      ) : (
        <>
          <Link href="/login">
            <Button variant="plain">Se connecter</Button>
          </Link>
          <Link href="/register">
            <Button>S'inscrire</Button>
          </Link>
        </>
      )}
      <ModeToggle />
    </Box>
  );
}
