'use client';

interface ClientRoomProps {
  initialToken: string;
}

export function ClientRoom({ initialToken }: ClientRoomProps) {
  return <div>Room, token: {initialToken}</div>;
}

export default ClientRoom;
