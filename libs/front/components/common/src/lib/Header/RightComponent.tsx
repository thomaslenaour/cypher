import { Box, Button } from '@cypher/front/shared/ui';
import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

interface HeaderRightComponentProps {
  authenticated: boolean;
  translations: {
    login: string;
    register: string;
    logout: string;
  };
}

export function HeaderRightComponent({
  authenticated,
  translations,
}: HeaderRightComponentProps) {
  return authenticated ? (
    <LogoutButton label={translations.logout} />
  ) : (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Link href="/login">
        <Button variant="outlined" color="neutral">
          {translations.login}
        </Button>
      </Link>
      <Link href="/register">
        <Button>{translations.register}</Button>
      </Link>
    </Box>
  );
}
