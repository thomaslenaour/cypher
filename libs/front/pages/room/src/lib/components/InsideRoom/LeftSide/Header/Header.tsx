import { Box, Stack, Typography } from '@cypher/front/shared/ui';
import { Hourglass, Mic, Users } from 'lucide-react';

interface HeaderProps {
  participants?: number;
  waitingArtists?: number;
  nextArtist?: string;
}

export function InsideRoomLeftSideHeader({
  participants,
  waitingArtists,
  nextArtist,
}: HeaderProps) {
  const cards = [
    {
      icon: <Users size="24px" />,
      title: 'Participants',
      value: participants || 0,
    },
    {
      icon: <Hourglass size="24px" />,
      title: 'En attente',
      value: waitingArtists || 0,
    },
    {
      icon: <Mic size="24px" />,
      title: 'Prochain MC',
      value: nextArtist || 'N/A',
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 2,
      }}
    >
      {cards.map((c, i) => (
        <Box
          key={`header-card-${i}`}
          sx={{
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'neutral.700' : 'neutral.200',
            borderRadius: '1px',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Box>{c.icon}</Box>
            <Typography
              level="title-lg"
              textAlign="center"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              {c.title}
            </Typography>
          </Stack>
          <Typography
            mt={1}
            level="h3"
            textAlign="center"
            color="primary"
            sx={{
              maxWidth: { xs: '126px', md: '220px' },
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {c.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
