import Link from 'next/link';

import { Box, Typography } from '@cypher/front/shared/ui';

type LinkType = { label: string; href: string };
interface NavigationProps {
  links: {
    [key: string]: LinkType;
  };
}

export function Navigation({ links }: NavigationProps) {
  return (
    <Box component="nav">
      <Box
        component="ul"
        sx={{
          display: 'flex',
          alignItems: 'center',
          listStyle: 'none',
          padding: 0,
          gap: 3,
        }}
      >
        {Object.entries(links).map(([key, { label, href }]) => (
          <Typography key={key} component="li">
            <Link href={href}>{label}</Link>
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default Navigation;
