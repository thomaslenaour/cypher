import { Box } from '@cypher/front/shared/ui';
import { Hourglass, Mic, Users } from 'lucide-react';
import { HeaderCard } from './HeaderCard/HeaderCard';

interface HeaderProps {
  participants?: number;
  waitingArtists?: string[];
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
      value: waitingArtists?.length || 0,
      listItems: waitingArtists || [],
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
        <HeaderCard key={`header-card-${i}`} {...c} />
      ))}
    </Box>
  );
}
