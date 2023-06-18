import Link from 'next/link';

import { Box, Typography } from '@cypher/front/shared/ui';

const links = {
  rooms: {
    label: 'Rooms',
    href: '/rooms',
  },
  events: {
    label: 'Evénements',
    href: '/events',
  },
  aboutUs: {
    label: 'A propos',
    href: '/about-us',
  },
  blog: {
    label: 'Blog',
    href: '/blog',
  },
};

export function Navigation() {
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
          <Typography component="li">
            <Link key={key} href={href}>
              {label}
            </Link>
          </Typography>
        ))}
      </Box>
    </Box>
  );
}

export default Navigation;
