'use client';

import { Divider, Stack, Typography } from '@cypher/front/shared/ui';
import { EmailLogin } from './EmailLogin';
import { ProvidersLogin } from './ProvidersLogin';

interface AuthenticationCardProps {
  title: string;
  description: string;
  dividerText: string;
  providers: {
    id: string;
    name: string;
  }[];
}

export function AuthenticationCard({
  title,
  description,
  dividerText,
  providers,
}: AuthenticationCardProps) {
  return (
    <Stack
      direction="column"
      gap={2}
      sx={{
        border: '1px solid',
        p: 4,
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'neutral.700' : 'neutral.200',
        borderRadius: '1px',
        width: '100%',
      }}
    >
      <Typography level="h3" fontWeight={700}>
        {title}
      </Typography>
      <Typography level="body-md" color="neutral">
        {description}
      </Typography>
      <EmailLogin />
      <Divider>{dividerText}</Divider>
      <ProvidersLogin providers={providers} />
    </Stack>
  );
}
