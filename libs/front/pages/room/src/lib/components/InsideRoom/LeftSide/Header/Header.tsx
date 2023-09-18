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
      title: 'Artistes en attente',
      value: waitingArtists || 0,
    },
    {
      icon: <Mic size="24px" />,
      title: 'Prochain rappeur',
      value: nextArtist || 'N/A',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        jusityContent: 'space-between',
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
            p: 2,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            {c.icon}
            <Typography level="title-lg">{c.title}</Typography>
          </Stack>
          <Typography
            mt={1}
            level="h2"
            textAlign="center"
            color="primary"
            sx={{
              maxWidth: '220px',
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
