import {
  Card,
  CardCover,
  CardContent,
  Typography,
} from '@cypher/front/shared/ui';
import { Users2 } from 'lucide-react';
import Image from 'next/image';
import roomBackgroundDefault from './room-background.default.jpg';

interface RoomCardProps {
  name: string;
  participantNumber?: number;
}

export function RoomCard({ name, participantNumber }: RoomCardProps) {
  return (
    <Card sx={{ minHeight: '280px', width: '100%' }}>
      <CardCover>
        <Image src={roomBackgroundDefault} alt="Room Background Image" />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="h2" fontSize="lg" textColor="#fff" mb={1}>
          {name}
        </Typography>
        <Typography
          startDecorator={<Users2 />}
          fontSize="sm"
          textColor="neutral.300"
        >
          participants
        </Typography>
      </CardContent>
    </Card>
  );
}

export default RoomCard;
