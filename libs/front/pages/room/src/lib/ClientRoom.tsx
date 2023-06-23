'use client';

interface ClientRoomProps {
  initialToken: string;
}

export function ClientRoom({ initialToken }: ClientRoomProps) {
  return <div>Single Room, token: {initialToken}</div>;
}

export default ClientRoom;
